// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen gap-6 font-sans bg-zinc-50 dark:bg-black">
//       <h1 className="text-4xl font-bold tracking-tight">
//         Welcome to Better Auth
//       </h1>

//       <p className="text-muted-foreground">
//         Sign in or create an account to get started.
//       </p>

//       <div className="flex gap-4">
//         <Button
//           nativeButton={false}
//           render={<Link href="/auth/register" />}
//         >
//           Register
//         </Button>

//         <Button
//           variant="outline"
//           nativeButton={false}
//           render={<Link href="/auth/login" />}
//         >
//           Login
//         </Button>
//       </div>
//     </div>
//   );
// }







// This is Part 3// This is Part 3// This is Part 3// This is Part 3
// This is Part 3
// This is Part 3
// This is Part 3
// This is Part 3

// This is Part 3
// This is Part 3

// This is Part 3


import { GetStartedButton } from "@/components/ui/get-started-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Better Auth Learning</h1>

      <GetStartedButton />
    </main>
  );
}









// import TestEmail from "@/components/test-email";

// export default function Home() {
//   return (
//     <main className="p-10">
//       <TestEmail />
//     </main>
//   );
// }