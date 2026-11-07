
// this is client side 
// this is client side 
// this is client side 
// this is client side 
// this is client side 
// this is client side 
// this is client side 
// this is client side 
// this is client side 




// "use client";

// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Loader2 } from "lucide-react";

// export const LoginForm = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [isPending, setIsPending] = useState(false);

//   // Show notification when the session expires
//   useEffect(() => {
//     if (searchParams.get("reason") === "session-expired") {
//       toast.info("Your session expired. Please log in again.");
//     }
//   }, [searchParams]);

//   async function handleSubmit(
//     evt: React.FormEvent<HTMLFormElement>
//   ) {
//     evt.preventDefault();

//     if (isPending) return;

//     const form = evt.currentTarget;
//     const formData = new FormData(form);

//     const email = String(formData.get("email") ?? "").trim();
//     const password = String(formData.get("password") ?? "");

//     if (!email) {
//       return toast.error("Please enter your email");
//     }

//     if (!password) {
//       return toast.error("Please enter your password");
//     }

//     setIsPending(true);

//     try {
//       await authClient.signIn.email(
//         {
//           email,
//           password,
//         },
//         {
//           onRequest: () => {
//             console.log("Login started");
//           },

//           onResponse: () => {
//             console.log("Login response received");
//           },

//           onError: (ctx) => {
//             toast.error(ctx.error.message);
//           },

//           onSuccess: () => {
//             toast.success("Login successful!");

//             form.reset();

//             router.push("/profile");
//             router.refresh();
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Login failed:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setIsPending(false);
//     }
//   }

//   return (
//     <div className="w-full max-w-md p-8 mx-auto space-y-6 border shadow-xl rounded-2xl bg-card">
//       <div className="space-y-2 text-center">
//         <h2 className="text-2xl font-bold tracking-tight">
//           Welcome back
//         </h2>

//         <p className="text-sm text-muted-foreground">
//           Enter your credentials to sign in.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="space-y-2">
//           <label htmlFor="email" className="text-sm font-medium">
//             Email address
//           </label>

//           <Input
//             id="email"
//             name="email"
//             type="email"
//             placeholder="name@example.com"
//             required
//             disabled={isPending}
//           />
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="password" className="text-sm font-medium">
//             Password
//           </label>

//           <Input
//             id="password"
//             name="password"
//             type="password"
//             placeholder="Enter your password"
//             required
//             disabled={isPending}
//           />
//         </div>

//         <Button
//           type="submit"
//           className="w-full"
//           disabled={isPending}
//         >
//           {isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Signing in...
//             </>
//           ) : (
//             "Sign in"
//           )}
//         </Button>
//       </form>

//       <p className="text-sm text-center text-muted-foreground">
//         Don't have an account?{" "}
//         <Link
//           href="/auth/register"
//           className="font-medium text-primary hover:underline"
//         >
//           Create account
//         </Link>
//       </p>
//     </div>
//   );
// };








// This is server side
// This is server side
// This is server side
// This is server side// This is server side
// This is server side// This is server side
// This is server side




"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { signInEmailAction } from "@/actions/sign-in-email.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInOauthButton } from "@/components/ui/sign-in-OAuth-button";

import { toast } from "sonner";

import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    startTransition(async () => {
      try {
        const result = await signInEmailAction(formData);

        if (result.success) {
          toast.success(result.message);
          router.push(result.redirectTo);
          router.refresh();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="p-8 space-y-8 border shadow-2xl rounded-3xl bg-card sm:p-10">

        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-primary/10">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome Back
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Sign in to access your account and continue learning.
            </p>
          </div>
        </div>

        {/* Email and Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
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

          {/* Password */}
          <div className="space-y-3">
            <Label htmlFor="password" className="text-sm font-semibold">
              Password
            </Label>

            <div className="relative">
              <LockKeyhole className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 text-base h-14 rounded-xl"
                autoComplete="current-password"
                required
                disabled={isPending}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute -translate-y-1/2 right-4 top-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isPending}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-semibold text-primary hover:underline underline-offset-4"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 text-base font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.01]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* OAuth Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-3 text-muted-foreground bg-card">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google and GitHub */}
        <div className="space-y-3">
          <SignInOauthButton provider="google" />
          <SignInOauthButton provider="github" />
        </div>

        {/* Register Link */}
        <p className="text-sm text-center text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-center text-muted-foreground">
        Protected authentication powered by Better Auth.
      </p>
    </div>
  );
}
