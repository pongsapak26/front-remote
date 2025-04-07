'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/login"); // Redirect to login page if user is not authenticated
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Welcome to Eakey</h1>
        <p className="mt-4 text-lg text-gray-400">
          Your one-stop solution for all your needs.
        </p>
      </main>
      <footer className="text-gray-500">
        &copy; 2023 Eakey. All rights reserved.
      </footer>
    </div>
  );
}
