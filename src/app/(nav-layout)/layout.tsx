import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NavLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col align-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
