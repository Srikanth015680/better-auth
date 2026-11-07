
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SessionGuard() {
  const router = useRouter();
  const isRedirecting = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let isChecking = false;

    const checkSession = async () => {
      if (!isMounted || isChecking || isRedirecting.current) {
        return;
      }

      isChecking = true;

      try {
        const { data: session, error } =
          await authClient.getSession({
            query: {
              disableCookieCache: true,
            },
          });

        if (!isMounted) return;

        if (error) {
          console.error("Session check error:", error);
          return;
        }

        if (!session) {
          isRedirecting.current = true;

          router.replace("/auth/login?reason=session-expired");
          router.refresh();
        }
      } catch (error) {
        console.error("Unable to check session:", error);
      } finally {
        isChecking = false;
      }
    };

    checkSession();

    const intervalId = window.setInterval(checkSession, 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [router]);

  return null;
}
