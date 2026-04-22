import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = process.env.PESAPAL_ENV === 'production'
  ? 'https://pay.pesapal.com/v3/api'
  : 'https://cybqa.pesapal.com/pesapalv3/api';

// Step 1: Authenticate with Pesapal and return a Bearer token
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
  if (!res.ok || !data.token) {
    throw new Error(data.message || 'Pesapal authentication failed');
  }
  return data.token as string;
}

// Step 2: Register our webhook (IPN) URL with Pesapal — returns an ipn_id
// We cache the IPN_ID in env. If already stored, we skip re-registration.
async function getIpnId(token: string): Promise<string> {
  // If you've already registered and stored the IPN_ID in env, reuse it
  if (process.env.PESAPAL_IPN_ID) return process.env.PESAPAL_IPN_ID;

  const res = await fetch(`${BASE_URL}/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook`,
      ipn_notification_type: 'POST',
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.ipn_id) {
    throw new Error(data.message || 'IPN registration failed');
  }
  return data.ipn_id as string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, first_name, last_name, phone_number } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const token = await getAccessToken();
    const ipn_id = await getIpnId(token);
    const order_id = `LH-HOST-${Date.now()}`;

    // Step 3: Submit the order — Pesapal returns a redirect URL to their hosted checkout
    const res = await fetch(`${BASE_URL}/Transactions/SubmitOrderRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: order_id,
        currency: 'USD',
        amount: 30,
        description: 'Loko Harvest - Web Hosting Setup Fee',
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/status`,
        notification_id: ipn_id,
        redirect_mode: 'TOP_WINDOW',
        billing_address: {
          email_address: email,
          phone_number: phone_number || '',
          first_name: first_name || 'Loko Harvest',
          last_name: last_name || 'Client',
        },
      }),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      return NextResponse.json(
        { error: data.message || 'Order submission failed' },
        { status: res.status }
      );
    }

    // Return the Pesapal-hosted checkout redirect URL to the frontend
    return NextResponse.json({
      order_tracking_id: data.order_tracking_id,
      redirect_url: data.redirect_url,
      status: 'pending',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
