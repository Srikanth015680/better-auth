
"use client";

import { useState } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

interface SignInOauthButtonProps {
  provider: "google" | "github";
  signUp?: true;
}

export const SignInOauthButton = ({
  provider,
  signUp,
}: SignInOauthButtonProps) => {
  const [isPending, setIsPending] = useState(false);

  const providerName = provider === "google" ? "Google" : "GitHub";
  const action = signUp ? "Sign up" : "Sign in";

  async function handleClick() {
    await signIn.social(
      {
        provider,
        callbackURL: "/profile",
        errorCallbackURL: "/auth/login/error",
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          setIsPending(false);
          toast.error(ctx.error.message || `${providerName} authentication failed`);
        },
      }
    );
  }

  return (
    <div className="w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full h-12 gap-3 rounded-xl"
        onClick={handleClick}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : provider === "google" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.28 5.65c4.25-3.92 6.7-9.7 6.7-17.3Z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.78l-7.28-5.65c-2.02 1.36-4.6 2.18-8.62 2.18-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.02c-3.22.7-3.9-1.36-3.9-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.57-.29-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.16 1.19a10.98 10.98 0 0 1 5.76 0c2.2-1.5 3.16-1.19 3.16-1.19.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.44-5.29 5.73.42.36.78 1.06.78 2.14v3.18c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
          </svg>
        )}

        {action} with {providerName}
      </Button>
    </div>
  );
};
