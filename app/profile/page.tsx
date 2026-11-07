
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { SignOutButton } from "@/components/ui/SignOutButton";
import { ReturnButton } from "@/components/ui/ReturnButton";
import { SessionGuard } from "@/components/ui/SessionGuard";
import { AccountSettings } from "@/components/ui/AccountSettings";
import Link from "next/link";
import { Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

function ProfileLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 p-6 bg-muted/40">
      <div className="relative flex items-center justify-center w-20 h-20">
        <div className="absolute inset-0 border-4 rounded-full border-primary/10" />
        <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-primary animate-spin" />

        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
          <ShieldCheck className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>

      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Loading your profile
        </h2>

        <p className="text-sm text-muted-foreground">
          Please wait while we verify your session...
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Checking authentication
      </div>
    </div>
  );
}

async function ProfileContent() {
  // 1. Get the current session
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Check authentication
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
        <h2 className="text-2xl font-bold">Unauthorized</h2>

        <p className="text-muted-foreground">
          Please sign in to access your profile.
        </p>

        <Link
          href="/auth/login"
          className="px-6 py-2 text-sm font-medium text-white transition rounded-lg bg-primary hover:opacity-90"
        >
          Login
        </Link>
      </div>
    );
  }

  // 3. Check whether the user has full post permissions
  const { success: hasFullPostAccess } =
    await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: {
          posts: ["update", "delete"],
        },
      },
    });

  // 4. Display profile
  return (
    <>
      <SessionGuard />

      <div className="w-full max-w-2xl p-8 space-y-6 border shadow-xl rounded-2xl bg-card">

        {/* Header */}
        <div className="flex items-center justify-between">
          <ReturnButton href="/" label="Home" />

          <span className="px-3 py-1 text-xs font-medium text-green-600 rounded-full bg-green-500/10">
            Authenticated
          </span>
        </div>

        {/* Profile Heading */}
        <div className="space-y-2 text-center">

          {session.user.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="object-cover w-16 h-16 mx-auto border rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold rounded-full bg-primary/10 text-primary">
              {session.user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
          )}

          <h1 className="text-3xl font-bold tracking-tight">
            My Profile
          </h1>

          <p className="text-sm text-muted-foreground">
            Your account information
          </p>
        </div>

        {/* User Information */}
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Name */}
          <div className="p-4 space-y-1 border rounded-lg">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-semibold">{session.user.name}</p>
          </div>

          {/* Email */}
          <div className="p-4 space-y-1 border rounded-lg">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-semibold break-all">
              {session.user.email}
            </p>
          </div>

          {/* Role */}
          <div className="p-4 space-y-1 border rounded-lg">
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-semibold uppercase">
              {session.user.role}
            </p>
          </div>

          {/* User ID */}
          <div className="p-4 space-y-1 border rounded-lg">
            <p className="text-sm text-muted-foreground">User ID</p>
            <p className="text-sm font-semibold break-all">
              {session.user.id}
            </p>
          </div>
        </div>

        {/* Update Profile and Change Password */}
        <AccountSettings
          initialName={session.user.name ?? ""}
          initialImage={session.user.image ?? ""}
        />

        {/* Permission Details */}
        <div className="p-5 space-y-4 border rounded-xl bg-muted/30">
          <h2 className="font-semibold">Post Permissions</h2>

          {hasFullPostAccess ? (
            <div className="flex items-center gap-3 text-green-600">
              <ShieldCheck className="w-5 h-5" />

              <div>
                <p className="font-semibold">Full Post Access</p>
                <p className="text-sm">
                  You can update and delete posts.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-destructive">
              <ShieldAlert className="w-5 h-5" />

              <div>
                <p className="font-semibold">Limited Post Access</p>
                <p className="text-sm">
                  You don't have both update and delete permissions.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Session Details */}
        <div className="p-5 space-y-4 overflow-x-auto border rounded-xl bg-muted/30">
          <h2 className="font-semibold">Session Details</h2>

          <pre className="text-xs leading-6 break-words whitespace-pre-wrap text-muted-foreground">
            {JSON.stringify(session, null, 2)}
          </pre>

          <SignOutButton />
        </div>

      </div>
    </>
  );
}

export default function ProfilePage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-muted/40">
      <Suspense fallback={<ProfileLoading />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
