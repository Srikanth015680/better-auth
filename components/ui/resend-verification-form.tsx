"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

interface ResendVerificationFormProps {
  initialEmail: string;
}

export default function ResendVerificationForm({
  initialEmail,
}: ResendVerificationFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleResend() {
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const { error: resendError } =
        await authClient.sendVerificationEmail({
          email: email.trim(),
          callbackURL: "/profile",
        });

      if (resendError) {
        setError(resendError.message || "Unable to send verification email.");
        return;
      }

      setMessage(
        "If your account needs verification, a new email has been sent. Check your inbox and Spam folder."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 text-left">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email address
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 text-sm border rounded-lg outline-none focus:border-blue-500"
        />
      </div>

      {message && (
        <p className="text-sm text-green-600">{message}</p>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="button"
        onClick={handleResend}
        disabled={loading}
        className="w-full px-4 py-3 text-sm font-medium text-white bg-black rounded-lg disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending..." : "Resend verification email"}
      </button>
    </div>
  );
}