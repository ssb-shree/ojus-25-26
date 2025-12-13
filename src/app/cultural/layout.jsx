import ComingSoon from "@/components/ComingSoon";
import React from "react";

export const metadata = {
  title: "OJUS – CULTURAL",
  description: "Made by the Ojus Tech Team 26",

  openGraph: {
    title: "OJUS – CULTURAL",
    description: "The official fest of APSIT. Music, chaos, memories.",
    url: "https://ojus-2025.vercel.app",
    siteName: "OJUS",
    images: [
      {
        url: "https://ojus-2025.vercel.app/cultural-2026.png",
        width: 1200,
        height: 630,
        alt: "OJUS Sports Logo",
      },
    ],
    type: "website",
  },
};

const CulturalLayout = ({ children }) => {
  return <ComingSoon type={"cultural"} />;
};

export default CulturalLayout;
