import { Suspense } from "react";
import ResendVerificationForm from "@/components/ui/resend-verification-form";

interface VerifyPageProps {
  searchParams: Promise<{
    error?: string;
    email?: string;
  }>;
}

async function VerifyContent({ searchParams }: VerifyPageProps) {
  const params = await searchParams;

  const hasError = Boolean(params.error);

  return (
    <div className="w-full max-w-md p-8 text-center bg-white border shadow-sm rounded-xl">
      <div className="mb-4 text-4xl">
        {hasError ? "⚠️" : "📧"}
      </div>

      <h1 className="mb-3 text-2xl font-bold text-gray-900">
        {hasError ? "Verification link problem" : "Check your email"}
      </h1>

      {hasError ? (
        <>
          <p className="mb-6 text-sm text-gray-600">
            This verification link is invalid, expired, or has already been
            used. Request a new verification email below.
          </p>

          <ResendVerificationForm initialEmail={params.email ?? ""} />
        </>
      ) : (
        <p className="text-sm text-gray-600">
          Please open your verification email and click the link to verify
          your email address.
        </p>
      )}
    </div>
  );
}

export default function VerifyPage(props: VerifyPageProps) {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <Suspense
        fallback={
          <div className="text-sm text-gray-600">
            Loading verification page...
          </div>
        }
      >
        <VerifyContent searchParams={props.searchParams} />
      </Suspense>
    </main>
  );
}