import Navbar from "@/myComponents/Navbar";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import LenisProvider from "@/components/LenisProvider";

import { Nova_Square } from "next/font/google";
const nova = Nova_Square({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ojus 2026",
  description: "Made by the Ojus Tech Team 26",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`bg-black text-white overflow-x-hidden ${nova.className}`}>
        <AuthProvider>
          <SmoothCursor />
          <LenisProvider>{children}</LenisProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
