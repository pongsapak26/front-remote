import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </header>
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
