import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const IBMPLEX = IBM_Plex_Sans({

  subsets: ["latin"],
  weight:["400"],
  variable:"--font-ibm-plex"

});

export const metadata: Metadata = {
  title: "Imaginify",
  description: "Ai powered image generator ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased",IBMPLEX.variable)}>{children}</body>
    </html>
  );
}
