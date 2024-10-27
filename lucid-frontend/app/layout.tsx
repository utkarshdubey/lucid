import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import BalancerProvider from "@/components/shared/BalancerProvider";
import "./globals.css";
import "./spinner.css";
import "./fancy.css";

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const general_sans = localFont({
  src: "./fonts/GeneralSans-Variable.woff2",
  display: "swap",
  variable: "--font-general-sans",
  preload: true,
});

export const metadata: Metadata = {
  title: "Lucid",
  description: "Simplifying Complexity, One Concept at a Time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${general_sans.variable}`}>
        <BalancerProvider>{children}</BalancerProvider>
      </body>
    </html>
  );
}
