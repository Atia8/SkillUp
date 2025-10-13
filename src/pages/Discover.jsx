// FILE: src/pages/Discover.jsx
// PURPOSE: Clean main page using components

import { useState } from "react";
import Navbar from "../components/navigation/Navbar";
import SearchBar from "../components/discover/SearchBar";
import SkillsSection from "../components/discover/SkillsSection";
import MentorsSection from "../components/discover/MentorsSection";
import HeroText from "../components/discover/HeroText";

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* NAVIGATION */}
      <Navbar />
      
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        
         {/* HERO TEXT */}
        <HeroText />
        
        {/* SEARCH */}
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        {/* POPULAR SKILLS */}
        <SkillsSection />
        
        {/* MENTORS */}
        <MentorsSection />
        
      </div>
    </div>
  );
}