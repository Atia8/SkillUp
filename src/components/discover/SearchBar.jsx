// FILE: src/components/discover/SearchBar.jsx
// PURPOSE: Search functionality for discover page

import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-600" />
          </div>
          <input
            type="text"
            placeholder="Search skills, mentors, or topics..."
            className="block w-full pl-10 pr-3 py-3  rounded-md border border-gray-300 bg-gray-100  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}