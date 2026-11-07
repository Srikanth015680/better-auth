"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.magicLink({
        email: email.trim(),
        callbackURL: "/profile",
      });

      if (error) {
        toast.error(error.message || "Failed to send Magic Link");
        return;
      }

      setSent(true);
      toast.success("Magic Link sent! Check your email.");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 mx-auto border rounded-xl">
      <h1 className="mb-2 text-2xl font-bold">Login with Magic Link</h1>

      <p className="mb-6 text-sm text-gray-500">
        Enter your registered email. We will send you a login link.
      </p>

      {sent ? (
        <p className="text-sm text-green-600">
          Magic Link sent. Please check your email.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-black rounded-md disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      )}
    </div>
  );
}