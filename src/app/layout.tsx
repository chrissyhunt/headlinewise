import type { Metadata } from "next";
import { Libre_Baskerville, Lato } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
