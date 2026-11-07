"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { isAPIError } from "better-auth/api";

type SignupResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      redirectTo?: string;
    };

export async function signUpEmailAction(
  formData: FormData
): Promise<SignupResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  // 1. Validate name
  if (!name) {
    return {
      success: false,
      message: "Please enter your name",
    };
  }

  // 2. Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email",
    };
  }

  // 3. Validate password
  if (password.length < 12) {
    return {
      success: false,
      message: "Password must contain at least 12 characters",
    };
  }

  try {
    // 4. Check whether user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered. Please log in.",
        redirectTo: "/auth/login",
      };
    }

    // 5. Register user through Better Auth
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    return {
      success: true,
      message: "Account created successfully! Please sign in.",
    };
  } catch (error) {
    console.error("Signup error:", error);

    if (isAPIError(error)) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}