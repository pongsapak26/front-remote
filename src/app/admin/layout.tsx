import Aside from "@/components/layout/Aside";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Aside />
      <main className="ml-64 flex-1 min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
