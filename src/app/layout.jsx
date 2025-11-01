import Navbar from "@/myComponents/Navbar";
import "./globals.css";

export const metadata = {
  title: "Ojus Sports",
  description: "Made by the Ojus Tech Team 26",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-black text-white overflow-x-hidden">{children}</body>
    </html>
  );
}
