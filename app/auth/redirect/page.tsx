
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthRedirectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  redirect("/profile");
}
