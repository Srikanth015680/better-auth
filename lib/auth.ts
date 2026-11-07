
// import { betterAuth } from "better-auth";
// import { prismaAdapter } from "better-auth/adapters/prisma";
// import { nextCookies } from "better-auth/next-js";
// import { APIError, createAuthMiddleware } from "better-auth/api";
// import { admin } from "better-auth/plugins";

// import { ac, roles } from "./permission";

// import {
//   VALID_DOMAINS,
//   VALID_PASSWORD,
//   VALID_NAME,
// } from "./utils";

// import { prisma } from "./prisma";
// import { hashPassword, verifyPassword } from "./argon2";
// import { UserRole } from "./generated/prisma/enums";
// import transporter from "./node-mailer";
// import { sendEmailAction } from "@/actions/send-email";

// // Read admin emails from .env
// const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
//   .split(",")
//   .map((email) => email.trim().toLowerCase())
//   .filter(Boolean);

// export const auth = betterAuth({
//   // Database configuration
//   database: prismaAdapter(prisma, {
//     provider: "postgresql",
//   }),

//   // Email and password authentication
//   emailAndPassword: {
//     enabled: true,
//     minPasswordLength: 12,
//     autoSignIn: false,
//     requireEmailVerification: true,

//     password: {
//       hash: hashPassword,
//       verify: verifyPassword,
//     },
   

//   // Email verification
//   emailVerification: {
//     sendOnSignUp: true,
//     expiresIn: 60 * 60,
//     autoSignInAfterVerification: true,

//     sendVerificationEmail: async ({ user, url }) => {
//       console.log("Sending verification email to:", user.email);

//       const info = await transporter.sendMail({
//         from: `"Better Auth" <${process.env.NODEMAILER_USER}>`,
//         to: user.email,
//         subject: "Verify your email address",

//         html: `
//           <div style="
//             font-family: Arial, sans-serif;
//             max-width: 600px;
//             margin: auto;
//             padding: 24px;
//           ">
//             <h2>Hello ${user.name}!</h2>

//             <p>Thank you for registering with Better Auth.</p>

//             <p>Please verify your email address:</p>

//             <a
//               href="${url}"
//               style="
//                 display: inline-block;
//                 background-color: #2563eb;
//                 color: white;
//                 padding: 12px 24px;
//                 text-decoration: none;
//                 border-radius: 6px;
//                 font-weight: bold;
//               "
//             >
//               Verify Email
//             </a>

//             <p style="margin-top: 24px;">
//               If you didn't create this account, ignore this email.
//             </p>

//             <p>Thanks,<br />Better Auth Team</p>
//           </div>
//         `,
//       });

//       console.log("Verification email sent:", info.messageId);
//     },
//   },
  

  

//   // Google and GitHub OAuth
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     },

//     github: {
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     },
//   },

//   // Session configuration
//   session: {
//     expiresIn: 5 * 60,
//     disableSessionRefresh: true,
//   },

//   // Account linking
//   account: {
//     accountLinking: {
//       enabled: false,
//     },
//   },

//   // Database hooks
//   databaseHooks: {
//     user: {
//       create: {
//         before: async (user) => {
//           const email = user.email.trim().toLowerCase();

//           if (ADMIN_EMAILS.includes(email)) {
//             return {
//               data: {
//                 ...user,
//                 role: UserRole.ADMIN,
//               },
//             };
//           }

//           return {
//             data: {
//               ...user,
//               role: UserRole.USER,
//             },
//           };
//         },
//       },
//     },
//   },

//   // Signup validation hooks
//   hooks: {
//     before: createAuthMiddleware(async (ctx) => {
//       if (ctx.path !== "/sign-up/email") return;

//       const { email, password, name } = ctx.body ?? {};

//       // 1. Validate email
//       if (
//         typeof email !== "string" ||
//         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//       ) {
//         throw new APIError("BAD_REQUEST", {
//           message: "Please enter a valid email",
//         });
//       }

//       // 2. Validate email domain
//       const domain = email.split("@")[1]?.toLowerCase();

//       if (!domain || !VALID_DOMAINS().includes(domain)) {
//         throw new APIError("BAD_REQUEST", {
//           message: "Email domain is not allowed",
//         });
//       }

//       // 3. Validate password
//       if (
//         typeof password !== "string" ||
//         !VALID_PASSWORD(password)
//       ) {
//         throw new APIError("BAD_REQUEST", {
//           message:
//             "Password must contain at least 12 characters, uppercase, lowercase, number and special character",
//         });
//       }

//       // 4. Validate name
//       if (typeof name !== "string" || !VALID_NAME(name)) {
//         throw new APIError("BAD_REQUEST", {
//           message:
//             "Name must contain at least 2 letters and only alphabets and spaces",
//         });
//       }
//     }),
//   },

//   // Database ID configuration
//   advanced: {
//     database: {
//       generateId: false,
//     },
//   },

//   // Better Auth plugins
//   plugins: [
//     admin({
//       // defaultRole: UserRole.USER,
//       // adminRoles: [UserRole.ADMIN],
//       ac,
//       roles,
//     }),

//     nextCookies(),
//   ]
// });



// Reset Password


// Reset Password
// Reset Password
// Reset Password
// Reset Password







import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";

import {
  admin,
  customSession,
  magicLink,
} from "better-auth/plugins";

import { ac, roles } from "./permission";

import {
  VALID_DOMAINS,
  VALID_PASSWORD,
  VALID_NAME,
} from "./utils";

import { prisma } from "./prisma";
import { hashPassword, verifyPassword } from "./argon2";
import { UserRole } from "./generated/prisma/enums";
import transporter from "./node-mailer";

// Read admin emails from .env
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const auth = betterAuth({
  // Database configuration
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    autoSignIn: false,
    requireEmailVerification: true,

    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },

    // Password reset configuration
    resetPasswordTokenExpiresIn: 60 * 60,

    sendResetPassword: async ({ user, url }) => {
      console.log("Sending password reset email to:", user.email);

      void transporter
        .sendMail({
          from: `"Better Auth" <${process.env.NODEMAILER_USER}>`,
          to: user.email,
          subject: "Reset Your Password",

          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 24px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
            ">
              <h2>Hello ${user.name}!</h2>

              <p>We received a request to reset your password.</p>

              <p>Click the button below to create a new password:</p>

              <a
                href="${url}"
                style="
                  display: inline-block;
                  background-color: #2563eb;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                "
              >
                Reset Password
              </a>

              <p style="margin-top: 24px;">
                This link expires in 1 hour.
              </p>

              <p>
                If you didn't request a password reset, ignore this email.
              </p>

              <p>Thanks,<br />Better Auth Team</p>
            </div>
          `,
        })
        .then((info) => {
          console.log("Password reset email sent:", info.messageId);
        })
        .catch((error) => {
          console.error("Password reset email failed:", error);
        });
    },
  },

  // Email verification
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      console.log("Sending verification email to:", user.email);

      void transporter
        .sendMail({
          from: `"Better Auth" <${process.env.NODEMAILER_USER}>`,
          to: user.email,
          subject: "Verify your email address",

          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 24px;
            ">
              <h2>Hello ${user.name}!</h2>

              <p>Thank you for registering with Better Auth.</p>

              <p>Please verify your email address:</p>

              <a
                href="${url}"
                style="
                  display: inline-block;
                  background-color: #2563eb;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                "
              >
                Verify Email
              </a>

              <p style="margin-top: 24px;">
                If you didn't create this account, ignore this email.
              </p>

              <p>Thanks,<br />Better Auth Team</p>
            </div>
          `,
        })
        .then((info) => {
          console.log("Verification email sent:", info.messageId);
        })
        .catch((error) => {
          console.error("Verification email failed:", error);
        });
    },
  },

  // Google and GitHub OAuth
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  // Session configuration
  session: {
    expiresIn: 5 * 60,
    disableSessionRefresh: true,
    cookieCache:{
      enabled:true,
      maxAge:5*60
    }
  },

  // Account linking
  account: {
    accountLinking: {
      enabled: false,
    },
  },

  // Database hooks
  databaseHooks: {
    user: {
      // Create user hook
      create: {
        before: async (user) => {
          const email = user.email.trim().toLowerCase();

          if (ADMIN_EMAILS.includes(email)) {
            return {
              data: {
                ...user,
                role: UserRole.ADMIN,
              },
            };
          }

          return {
            data: {
              ...user,
              role: UserRole.USER,
            },
          };
        },
      },

      // Update user hook
      update: {
        before: async (data) => {
          console.log("Before user update:", data);

          if (typeof data.name === "string") {
            const name = data.name.trim();

            if (!name || !VALID_NAME(name)) {
              throw new APIError("BAD_REQUEST", {
                message: "Please enter a valid name",
              });
            }

            return {
              data: {
                ...data,
                name,
              },
            };
          }

          return {
            data,
          };
        },

        after: async (user) => {
          console.log("User updated successfully:", user.id);
        },
      },
    },
  },

  // Signup validation hooks
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;

      const { email, password, name } = ctx.body ?? {};

      // 1. Validate email
      if (
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        throw new APIError("BAD_REQUEST", {
          message: "Please enter a valid email",
        });
      }

      // 2. Validate email domain
      const domain = email.split("@")[1]?.toLowerCase();

      if (!domain || !VALID_DOMAINS().includes(domain)) {
        throw new APIError("BAD_REQUEST", {
          message: "Email domain is not allowed",
        });
      }

      // 3. Validate password
      if (
        typeof password !== "string" ||
        !VALID_PASSWORD(password)
      ) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Password must contain at least 12 characters, uppercase, lowercase, number and special character",
        });
      }

      // 4. Validate name
      if (typeof name !== "string" || !VALID_NAME(name)) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Name must contain at least 2 letters and only alphabets and spaces",
        });
      }
    }),
  },

  // Database ID configuration
  advanced: {
    database: {
      generateId: false,
    },
  },

  // Better Auth plugins
  plugins: [
    // Admin plugin
    admin({
      // defaultRole: UserRole.USER,
      // adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),

    // Custom Session plugin
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          customField: "My Custom User",
        },

        session: {
          ...session,
          customField: "My Custom Session",
        },
      };
    }),

    // Magic Link plugin
    magicLink({
      expiresIn: 5 * 60,
      disableSignUp: true,

      sendMagicLink: async ({ email, url }) => {
        console.log("Sending Magic Link to:", email);

        await transporter.sendMail({
          from: `"Better Auth" <${process.env.NODEMAILER_USER}>`,
          to: email,
          subject: "Magic Link Login",

          html: `
            <div style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: auto;
              padding: 24px;
              border: 1px solid #e5e7eb;
              border-radius: 12px;
            ">
              <h2>Magic Link Login</h2>

              <p>Please click the button below to log in:</p>

              <a
                href="${url}"
                style="
                  display: inline-block;
                  background-color: #2563eb;
                  color: white;
                  padding: 12px 24px;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: bold;
                "
              >
                Login to your account
              </a>

              <p style="margin-top: 24px;">
                This link expires in 5 minutes and can only be used once.
              </p>

              <p>
                If you didn't request this link, ignore this email.
              </p>

              <p>Thanks,<br />Better Auth Team</p>
            </div>
          `,
        });

        console.log("Magic Link email sent to:", email);
      },
    }),

    // Must be the last plugin
    nextCookies(),
  ],
});
