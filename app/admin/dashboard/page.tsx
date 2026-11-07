
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

import { SignOutButton } from "@/components/ui/SignOutButton";
import { AdminUserTable } from "@/components/ui/admin-user-table";

import {
  ShieldCheck,
  Users,
  UserRound,
  Loader2,
} from "lucide-react";

// Loading UI
function AdminDashboardLoading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-muted/40">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">
        Loading Admin Dashboard...
      </p>
    </main>
  );
}

// Async component
async function AdminDashboardContent() {
  // 1. Get current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Check authentication
  if (!session) {
    redirect("/auth/login");
  }

  // 3. Check admin role
  if (session.user.role !== "ADMIN") {
    redirect("/profile");
  }

  // 4. Get user statistics
  const totalUsers = await prisma.user.count();

  const adminUsers = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });

  const regularUsers = await prisma.user.count({
    where: {
      role: "USER",
    },
  });

  // 5. Get all users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen p-6 bg-muted/40">
      <div className="mx-auto space-y-8 max-w-7xl">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Admin Dashboard
              </h1>

              <p className="text-sm text-muted-foreground">
                Welcome, {session.user.name}
              </p>
            </div>
          </div>

          <SignOutButton />
        </div>

        {/* Admin Status */}
        <div className="p-5 border rounded-xl bg-card">
          <p className="font-semibold text-green-600">
            ADMIN ACCESS GRANTED
          </p>

          <p className="text-sm text-muted-foreground">
            You are authorized to manage users.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-3">

          {/* Total Users */}
          <div className="p-6 space-y-3 border rounded-xl bg-card">
            <Users className="w-7 h-7 text-primary" />

            <p className="text-sm text-muted-foreground">
              Total Users
            </p>

            <p className="text-3xl font-bold">
              {totalUsers}
            </p>
          </div>

          {/* Admin Users */}
          <div className="p-6 space-y-3 border rounded-xl bg-card">
            <ShieldCheck className="w-7 h-7 text-primary" />

            <p className="text-sm text-muted-foreground">
              Admin Users
            </p>

            <p className="text-3xl font-bold">
              {adminUsers}
            </p>
          </div>

          {/* Regular Users */}
          <div className="p-6 space-y-3 border rounded-xl bg-card">
            <UserRound className="w-7 h-7 text-primary" />

            <p className="text-sm text-muted-foreground">
              Regular Users
            </p>

            <p className="text-3xl font-bold">
              {regularUsers}
            </p>
          </div>

        </div>

        {/* User Management */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">
              User Management
            </h2>

            <p className="text-sm text-muted-foreground">
              View and manage all registered users.
            </p>
          </div>

          <AdminUserTable users={users} />
        </section>

      </div>
    </main>
  );
}

// Page component
export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminDashboardLoading />}>
      <AdminDashboardContent />
    </Suspense>
  );
}
