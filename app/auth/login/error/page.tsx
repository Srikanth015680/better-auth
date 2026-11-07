
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    account_not_linked:
      "An account with this email already exists. Try signing in using your original authentication method.",
    unable_to_create_user:
      "We couldn't create your account. Please try again.",
    access_denied:
      "You cancelled the authentication process.",
    invalid_callback:
      "The authentication callback was invalid. Please try again.",
  };

  const message =
    errorMessages[error ?? ""] ??
    "Something went wrong during authentication. Please try again.";

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 text-center border shadow-lg rounded-2xl bg-card">
        <div className="text-5xl">⚠️</div>

        <h1 className="text-2xl font-bold">
          Authentication Failed
        </h1>

        <p className="text-muted-foreground">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <Button asChild className="w-full rounded-xl">
            <Link href="/auth/login">
              Back to Login
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full rounded-xl"
          >
            <Link href="/auth/register">
              Create Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AuthErrorContent />
    </Suspense>
  );
}
