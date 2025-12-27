import Footer from "@/myComponents/cultural/Footer";
import Hero from "@/myComponents/cultural/Hero";
import Sections from "@/myComponents/cultural/Sections";
import React from "react";

const CulturalPage = () => {
  return (
    <main className="min-h-screen w-screen flex flex-col justify-center items-center">
      <Hero />
      <Sections />
      <Footer />
    </main>
  );
};

export default CulturalPage;
