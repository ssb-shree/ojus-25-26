import Footer from "@/myComponents/cultural/Footer";
import Hero from "@/myComponents/cultural/Hero";
import Sections from "@/myComponents/cultural/Sections";
import { culturalEventsData } from "@/lib/culturalData";
import React from "react";

const CulturalPage = () => {
  return (
    <main className="min-h-screen w-screen flex flex-col justify-center items-center">
      <Hero />
      
      {/* Day 1 Section */}
      <Sections 
        title="Day 1 of Ojus Cultural" 
        venue={culturalEventsData["1"].venue}
        description={culturalEventsData["1"].description}
        dayNumber={1}
        dayEvents={culturalEventsData["1"].events}
        defaultEvent={culturalEventsData["1"].events[0]}
        buttonText="Explore all Day 1 events"
      />
      
      {/* Day 2 Section */}
      <Sections 
        title="Day 2 of Ojus Cultural" 
        venue={culturalEventsData["2"].venue}
        description={culturalEventsData["2"].description}
        dayNumber={2}
        dayEvents={culturalEventsData["2"].events}
        defaultEvent={culturalEventsData["2"].events[0]}
        buttonText="Explore all Day 2 events"
      />
      
      {/* Day 3 Section */}
      <Sections 
        title="Day 3 of Ojus Cultural" 
        venue={culturalEventsData["3"].venue}
        description={culturalEventsData["3"].description}
        dayNumber={3}
        dayEvents={culturalEventsData["3"].events}
        defaultEvent={culturalEventsData["3"].events[0]}
        buttonText="Explore all Day 3 events"
      />
      
      <Footer />
    </main>
  );
};

export default CulturalPage;