
import { Suspense } from "react";
import { LoginForm } from "@/components/ui/LoginForm";
import { ReturnButton } from "@/components/ui/ReturnButton";

import {
  Loader2,
  ShieldCheck,
} from "lucide-react";

function LoginLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md min-h-[420px] gap-6 p-8 border shadow-xl rounded-2xl bg-card">

      {/* Animated icon */}
      <div className="relative flex items-center justify-center w-24 h-24">
        <div className="absolute inset-0 border-4 rounded-full border-primary/10" />

        <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-primary border-r-primary/40 animate-spin" />

        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <ShieldCheck className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>

      {/* Loading text */}
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold tracking-tight">
          Preparing your login
        </h2>

        <p className="text-sm text-muted-foreground">
          Please wait while we securely initialize authentication.
        </p>
      </div>

      {/* Loading indicator */}
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading login form...
      </div>

      {/* Animated loading bars */}
      <div className="flex w-full gap-2">
        <div className="w-1/3 h-1.5 rounded-full bg-primary animate-pulse" />

        <div className="w-1/3 h-1.5 rounded-full bg-primary/40 animate-pulse [animation-delay:200ms]" />

        <div className="w-1/3 h-1.5 rounded-full bg-primary/20 animate-pulse [animation-delay:400ms]" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-6 bg-muted/40">

      {/* Home Button */}
      <div className="w-full max-w-md">
        <ReturnButton href="/" label="Home" />
      </div>

      {/* Login Form */}
      <Suspense fallback={<LoginLoading />}>
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </Suspense>
    </div>
  );
}
