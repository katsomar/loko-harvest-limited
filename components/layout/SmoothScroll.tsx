"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle scroll to top or hash on navigation
    const handleNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        // Add a small delay for Next.js to finish mounting the route components
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.5 });
          }
        }, 300);
      } else {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
      }
    };

    handleNavigation();

    return () => {
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
