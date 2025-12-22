import ComingSoon from "@/components/ComingSoon";
import React from "react";

export const metadata = {
  title: "OJUS – SPORTS",
  description: "Made by the Ojus Tech Team 26",

  openGraph: {
    title: "OJUS – SPORTS",
    description: "The official sports event of APSIT.",
    url: "https://ojus.apsit.edu.in",
    siteName: "OJUS",
    images: [
      {
        url: "https://ojus-2025.vercel.app/sports-2026.png",
        width: 1200,
        height: 630,
        alt: "OJUS Sports Logo",
      },
    ],
    type: "website",
  },
};

const CulturalLayout = ({ children }) => {
  // return <ComingSoon type={"sports"} />;
  return children;
};

export default CulturalLayout;
