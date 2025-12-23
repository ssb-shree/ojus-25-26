import Navbar from "@/myComponents/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import LenisProvider from "@/components/LenisProvider";

import { Nova_Square } from "next/font/google";
import { Toaster } from "react-hot-toast";
const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "OJUS – Reveric Etheria",
  description: "Made by the Ojus Tech Team 26",

  openGraph: {
    title: "OJUS – Reveric Etheria",
    description: "The official fest of APSIT. Music, chaos, memories.",
    url: "https://ojus.apsit.edu.in",
    siteName: "OJUS",
    images: [
      {
        url: "https://ojus-2025.vercel.app/logo.jpg",
        width: 1200,
        height: 630,
        alt: "OJUS Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white overflow-x-hidden ${nova.className}`}>
        <Toaster position="top-right" />
        <AuthProvider>
          <SmoothCursor />
          <LenisProvider>{children}</LenisProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
