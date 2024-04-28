import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-libre-baskerville",
});

const lato = Lato({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "HeadlineWise",
  description: "A headline analysis tool built by Chrissy Hunt",
  authors: {
    url: "https://chrissyhunt.com",
    name: "Chrissy Hunt",
  },
  keywords: "media literacy, news, headlines, ai analysis, claude ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${lato.variable} bg-gradient-to-r from-fuchsia-200 to-cyan-100 font-sans flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow flex flex-col align-center justify-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
