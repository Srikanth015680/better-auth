
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";

import {
  LockKeyhole,
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const invalidToken = searchParams.has("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token || invalidToken) {
      toast.error("Your reset link is invalid or expired.");
      return;
    }

    if (password.length < 12) {
      toast.error("Password must contain at least 12 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsPending(true);

    //   const { error } = await authClient.resetPassword({
    //     newPassword: password,
    //     token,
    //   });


    const {error}=await authClient.resetPassword({
        newPassword:password,
        token
    })

      if (error) {
        toast.error(error.message || "Unable to reset password.");
        return;
      }

      setIsSubmitted(true);
      toast.success("Password reset successfully!");

      setTimeout(() => {
        router.push("/auth/login");
        router.refresh();
      }, 1500);
    } catch (error) {
      console.error("Reset password error:", error);
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
                {isSubmitted
                  ? "Password Updated!"
                  : "Reset Your Password"}
              </h1>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {isSubmitted
                  ? "Your password has been changed successfully. Redirecting you to login..."
                  : "Create a new secure password for your account."}
              </p>
            </div>
          </div>

          {/* Invalid Token */}
          {invalidToken || !token ? (
            <div className="space-y-5 text-center">
              <p className="text-sm text-destructive">
                Your password reset link is invalid or has expired.
                Please request a new reset link.
              </p>

              <Link
                href="/auth/forgot-password"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Request another reset link
              </Link>
            </div>
          ) : isSubmitted ? (
            <div className="text-center">
              <Button
                className="w-full h-14 rounded-xl"
                onClick={() => router.push("/auth/login")}
              >
                Go to Login
              </Button>
            </div>
          ) : (
            /* Reset Password Form */
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* New Password */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-semibold">
                  New Password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 text-base h-14 rounded-xl"
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute -translate-y-1/2 right-4 top-1/2 text-muted-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground">
                  Minimum 12 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold"
                >
                  Confirm New Password
                </Label>

                <div className="relative">
                  <LockKeyhole className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-12 pr-12 text-base h-14 rounded-xl"
                    autoComplete="new-password"
                    required
                    disabled={isPending}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute -translate-y-1/2 right-4 top-1/2 text-muted-foreground"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="w-full text-base font-semibold shadow-lg h-14 rounded-xl"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
                    Reset Password
                    <LockKeyhole className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Back to Login */}
          {!isSubmitted && (
            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-center text-muted-foreground">
          Protected authentication powered by Better Auth.
        </p>
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-6 h-6 animate-spin" />
        </main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
