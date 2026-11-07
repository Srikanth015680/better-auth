
"use client";

import { useState } from "react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import {
  Mail,
  ArrowLeft,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setIsPending(true);

      const { error } = await authClient.requestPasswordReset({
        email: email.trim(),
        redirectTo: "/auth/reset-password",
      });

      if (error) {
        toast.error(error.message || "Unable to send reset email.");
        return;
      }

      setIsSubmitted(true);

      toast.success("Password reset email requested successfully!");
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-10 bg-background">
      <div className="w-full max-w-md">

        <div className="p-8 space-y-8 border shadow-2xl rounded-3xl bg-card sm:p-10">

          {/* Header */}
          <div className="space-y-4 text-center">

            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-primary/10">
              {isSubmitted ? (
                <CheckCircle2 className="w-8 h-8 text-primary" />
              ) : (
                <ShieldCheck className="w-8 h-8 text-primary" />
              )}
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {isSubmitted ? "Check Your Email" : "Forgot Password?"}
              </h1>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {isSubmitted
                  ? "If an account exists with this email, you will receive a password reset link. Please check your inbox and Spam folder."
                  : "No worries! Enter your registered email address and we'll send you a link to reset your password."}
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            /* Forgot Password Form */
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>

                <div className="relative">
                  <Mail className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 text-base h-14 rounded-xl"
                    autoComplete="email"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full text-base font-semibold shadow-lg h-14 rounded-xl"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <Mail className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

            </form>
          ) : (
            <Button
              type="button"
              variant="outline"
              className="w-full h-14 rounded-xl"
              onClick={() => setIsSubmitted(false)}
            >
              Try Another Email
            </Button>
          )}

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-6 text-xs text-center text-muted-foreground">
          Protected authentication powered by Better Auth.
        </p>

      </div>
    </main>
  );
}
