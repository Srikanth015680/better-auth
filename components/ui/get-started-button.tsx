
"use client";

import { authClient } from "@/lib/auth-client";

export function GetStartedButton() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return <p>Loading session...</p>;
  }

  if (error) {
    return <p>Unable to fetch session: {error.message}</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p>Welcome, {session.user.name}!</p>
      <p>Email: {session.user.email}</p>

      <p>
        Role: <strong>{session.user.role}</strong>
      </p>
    </div>
  );
}
