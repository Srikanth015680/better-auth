import { createAuthClient } from "better-auth/react";

import {
  inferAdditionalFields,
  adminClient,
  magicLinkClient,
  customSessionClient,
} from "better-auth/client/plugins";

import type { auth } from "./auth";
import { ac, roles } from "./permission";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({
      ac,
      roles,
    }),
    magicLinkClient(),
    customSessionClient<typeof auth>(),
  ],
});

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  sendVerificationEmail,
} = authClient;