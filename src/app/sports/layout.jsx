import ComingSoon from "@/components/ComingSoon";

export const metadata = {
  title: "OJUS – SPORTS",
  description: "Made by the Ojus Tech Team 26",

  openGraph: {
    title: "OJUS – SPORTS",
    description: "The official fest of APSIT. Music, chaos, memories.",
    url: "https://ojus-2025.vercel.app",
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

const SportsLayout = ({ children }) => {
  return <ComingSoon type="sports" />;
};

export default SportsLayout;
