
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { isAPIError } from "better-auth/api";

type SigninResult =
  | {
      success: true;
      message: string;
      redirectTo: string;
    }
  | {
      success: false;
      message: string;
    };

export async function signInEmailAction(
  formData: FormData
): Promise<SigninResult> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email) {
    return {
      success: false,
      message: "Please enter your email",
    };
  }

  if (!password) {
    return {
      success: false,
      message: "Please enter your password",
    };
  }

  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });

    // Redirect based on user role
    const redirectTo =
      result.user.role === "ADMIN"
        ? "/admin/dashboard"
        : "/profile";

    return {
      success: true,
      message: "Login successful!",
      redirectTo,
    };
  } catch (error) {
    console.error("Signin error:", error);

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



// // Manuallly
// // Manuallly
// // Manuallly
// // Manuallly
// // Manuallly
// // Manuallly
// // Manuallly
// // Manuallly













// "use server";

// import { auth } from "@/lib/auth";
// import { cookies, headers } from "next/headers";
// import { parseSetCookieHeader } from "better-auth/cookies";

// type SigninResult =
//   | { success: true; message: string }
//   | { success: false; message: string };

// export async function signInEmailAction(
//   formData: FormData
// ): Promise<SigninResult> {
//   const email = String(formData.get("email") ?? "").trim();
//   const password = String(formData.get("password") ?? "");

//   if (!email || !password) {
//     return {
//       success: false,
//       message: "Email and password are required",
//     };
//   }

//   try {
//     // 1. Authenticate user
//     const response = await auth.api.signInEmail({
//       body: { email, password },
//       headers: await headers(),
//       asResponse: true,
//     });

//     if (!response.ok) {
//       return {
//         success: false,
//         message: "Invalid email or password",
//       };
//     }

//     // 2. Get all Set-Cookie headers
//     const setCookieHeaders = response.headers.getSetCookie();

//     if (setCookieHeaders.length === 0) {
//       return {
//         success: false,
//         message: "Session cookie was not returned",
//       };
//     }

//     // 3. Get Next.js cookie store
//     const cookieStore = await cookies();

//     // 4. Parse and manually set each cookie
//     for (const cookieString of setCookieHeaders) {
//       const parsedCookie = parseSetCookieHeader(cookieString);

//       if (!parsedCookie) continue;

//       const { name, value, ...attributes } = parsedCookie;

//       cookieStore.set(name, value, attributes);
//     }

//     return {
//       success: true,
//       message: "Login successful!",
//     };
//   } catch (error) {
//     console.error("Signin error:", error);

//     return {
//       success: false,
//       message: "Login failed",
//     };
//   }
// }






// Another way 
// Another way 
// Another way 
// Another way 
// // Another way 
// "use server";

// import { cookies } from "next/headers";

// export async function createCookie() {
//   const cookieStore = await cookies();

//   cookieStore.set("session", "abc123", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 5,
//   });
// }