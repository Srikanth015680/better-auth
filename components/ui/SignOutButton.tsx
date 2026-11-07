
"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!");

          router.push("/auth/login");
          router.refresh();
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsPending(false);
        },
      },
    });
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="destructive"
      disabled={isPending}
    >
      <LogOut className="w-4 h-4 mr-2" />
      {isPending ? "Signing out..." : "Logout"}
    </Button>
  );
}
