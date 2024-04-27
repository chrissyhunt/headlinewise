import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${lato.variable} bg-gradient-to-r from-fuchsia-200 to-cyan-100 font-sans`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
