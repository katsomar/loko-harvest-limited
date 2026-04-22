import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.PESAPAL_ENV === 'production'
  ? 'https://pay.pesapal.com/v3/api'
  : 'https://cybqa.pesapal.com/pesapalv3/api';

async function getAccessToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/Auth/RequestToken`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });
  const data = await res.json();
  return data.token as string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderTrackingId } = body;

    if (!orderTrackingId) {
      return NextResponse.json({ error: 'orderTrackingId is required' }, { status: 400 });
    }

    // 1. Get a fresh access token
    const token = await getAccessToken();

    // 2. Query Pesapal for the real transaction status
    const res = await fetch(
      `${BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || 'Verification failed' }, { status: res.status });
    }

    // payment_status_code: 1 = INVALID, 2 = COMPLETED, 3 = FAILED, 4 = REVERSED
    const statusMap: Record<number, string> = {
      1: 'INVALID',
      2: 'COMPLETED',
      3: 'FAILED',
      4: 'REVERSED',
    };

    return NextResponse.json({
      status: statusMap[data.payment_status_code] ?? 'PENDING',
      amount: data.amount,
      currency: data.currency,
      payment_method: data.payment_method,
      order_tracking_id: data.order_tracking_id,
      merchant_reference: data.merchant_reference,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// Pesapal POSTs to this endpoint when a payment status changes (IPN)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderTrackingId = searchParams.get('OrderTrackingId');
  const merchantReference = searchParams.get('OrderMerchantReference');

  if (!orderTrackingId) {
    return NextResponse.json({ error: 'Missing OrderTrackingId' }, { status: 400 });
  }

  try {
    const token = await getAccessToken();

    const res = await fetch(
      `${BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    // Log confirmed payments — you can extend this to update a DB or send emails
    if (data.payment_status_code === 2) {
      console.log(`✅ PAYMENT CONFIRMED | Ref: ${merchantReference} | Tracking: ${orderTrackingId} | Amount: ${data.amount} ${data.currency}`);
      // TODO: Set IS_SITE_LOCKED = false in DB, or send email notification
    }

    // Pesapal requires you to return a 200 with specific JSON to acknowledge the IPN
    return NextResponse.json({
      orderNotificationType: 'IPNCHANGE',
      orderTrackingId,
      orderMerchantReference: merchantReference,
      status: 200,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
