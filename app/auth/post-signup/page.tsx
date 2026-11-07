import Link from "next/link";

export default function PostSignupPage() {
  return (
    <main className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md p-8 text-center bg-white border shadow-sm rounded-xl">
        <div className="mb-4 text-5xl">📧</div>

        <h1 className="mb-3 text-2xl font-bold">
          Check your email!
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Your account has been created. We have sent you a verification
          email. Please open your inbox and click the verification link.
        </p>

        <Link
          href="/auth/login"
          className="block w-full px-4 py-3 text-white bg-black rounded-lg"
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}