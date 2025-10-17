// FILE: src/components/discover/HeroText.jsx
// PURPOSE: Hero section text for Discover page

export default function HeroText() {
  return (
    <div className="px-4 py-6 sm:px-0 text-center">
      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Discover Skills & Mentors
      </h1>
      
      {/* Subheading */}
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Find the perfect mentor to learn new skills or discover peers who share your interests
      </p>
    </div>
  );
}