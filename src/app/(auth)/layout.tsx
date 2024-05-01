import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex-grow flex flex-col align-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
