
// "use client";

// // thi is is using tht client side login or rgeister
//   // thi is is using tht client side login or rgeister
// // thi is is using tht client side login or rgeister
// // thi is is using tht client side login or rgeister

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { authClient } from "@/lib/auth-client";
// import { useState } from "react";
// import { Loader2 } from "lucide-react";

// export const RegisterForm = () => {
//   const router = useRouter();
//   const [isPending, setIsPending] = useState(false);

//   async function handleSubmit(
//     evt: React.FormEvent<HTMLFormElement>
//   ) {
//     evt.preventDefault();

//     if (isPending) return;

//     const form = evt.currentTarget;
//     const formData = new FormData(form);

//     const name = String(formData.get("name") ?? "").trim();

//     if (!name) {
//       return toast.error("Please enter your name");
//     }

//     const email = String(formData.get("email") ?? "").trim();

//     if (!email) {
//       return toast.error("Please enter your email");
//     }

//     const password = String(formData.get("password") ?? "");

//     if (!password) {
//       return toast.error("Please enter your password");
//     }

//     setIsPending(true);

//     try {
//       await authClient.signUp.email(
//         {
//           name,
//           email,
//           password,
//         },
//         {
//           autoSignIn: false,

//           onRequest: () => {
//             console.log("Registration started");
//           },

//           onResponse: () => {
//             console.log("Registration response received");
//           },

//           onError: (ctx) => {
//             toast.error(ctx.error.message);
//           },

//           onSuccess: () => {
//             toast.success("Account created successfully!");

//             form.reset();

//             router.push("/auth/login");
//             router.refresh();
//           }
//         }
//       );
//     } catch (error) {
//       console.error("Registration failed:", error);
//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setIsPending(false);
//     }
//   }

//   return (
//     <div className="w-full max-w-md p-8 mx-auto border shadow-lg rounded-xl bg-card">
//       <div className="mb-6 space-y-2 text-center">
//         <h2 className="text-2xl font-bold tracking-tight">
//           Create an account
//         </h2>

//         <p className="text-sm text-muted-foreground">
//           Enter your details to get started.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         <div className="space-y-2">
//           <label htmlFor="name" className="text-sm font-medium">
//             Full name
//           </label>

//           <Input
//             id="name"
//             name="name"
//             type="text"
//             placeholder="John Doe"
//             required
//             disabled={isPending}
//           />
//         </div>

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
//             minLength={12}
//             required
//             disabled={isPending}
//           />
//         </div>

//         <Button
//           disabled={isPending}
//           type="submit"
//           className="w-full"
//         >
//           {isPending ? (
//             <>
//               <Loader2 className="w-4 h-4 animate-spin" />
//               Creating account...
//             </>
//           ) : (
//             "Create account"
//           )}
//         </Button>
//       </form>

//       <p className="mt-6 text-sm text-center text-muted-foreground">
//         Already have an account?{" "}
//         <Link
//           href="/auth/login"
//           className="font-medium text-primary hover:underline"
//           aria-disabled={isPending}
//           tabIndex={isPending ? -1 : 0}
//           onClick={(event) => {
//             if (isPending) event.preventDefault();
//           }}
//         >
//           Sign in
//         </Link>
//       </p>
//     </div>
//   );
// };




// This is server side
// This is server side
// This is server side
// This is server side
// This is server side
// This is server side
// This is server side
// This is server side
// This is server side
// This is server side




"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpEmailAction } from "@/actions/sign-up-email.actions";
import { SignInOauthButton } from "@/components/ui/sign-in-OAuth-button";

import { toast } from "sonner";

import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Loader2,
  UserPlus,
} from "lucide-react";

export const RegisterForm = () => {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(
    evt: React.FormEvent<HTMLFormElement>
  ) {
    evt.preventDefault();

    if (isPending) return;

    const form = evt.currentTarget;
    const formData = new FormData(form);

    setIsPending(true);

    try {
      const result = await signUpEmailAction(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      form.reset();

      router.push("/auth/login");
      router.refresh();

    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again.");

    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">

      {/* Register Card */}
      <div className="p-8 space-y-8 border shadow-2xl rounded-3xl bg-card sm:p-10">

        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-primary/10">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Create Account
            </h1>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Join us today. Enter your details to create your account.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div className="space-y-3">
            <label
              htmlFor="name"
              className="text-sm font-semibold"
            >
              Full Name
            </label>

            <div className="relative">
              <UserRound className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-12 pr-4 text-base h-14 rounded-xl"
                autoComplete="name"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="text-sm font-semibold"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className="pl-12 pr-4 text-base h-14 rounded-xl"
                autoComplete="email"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label
              htmlFor="password"
              className="text-sm font-semibold"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />

              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className="pl-12 pr-12 text-base h-14 rounded-xl"
                autoComplete="new-password"
                minLength={12}
                required
                disabled={isPending}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute transition -translate-y-1/2 right-4 top-1/2 text-muted-foreground hover:text-foreground"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                disabled={isPending}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <p className="text-xs text-muted-foreground">
              Minimum 12 characters with uppercase, lowercase,
              number and special character.
            </p>
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 text-base font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.01]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
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
              Or sign up with
            </span>
          </div>
        </div>

        {/* Google and GitHub */}
        <div className="space-y-3">
          <SignInOauthButton provider="google" signUp />
          <SignInOauthButton provider="github" signUp />
        </div>

        {/* Login Link */}
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-primary hover:underline underline-offset-4"
            aria-disabled={isPending}
            tabIndex={isPending ? -1 : 0}
            onClick={(event) => {
              if (isPending) event.preventDefault();
            }}
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4" />
        Protected authentication powered by Better Auth.
      </div>
    </div>
  );
};
