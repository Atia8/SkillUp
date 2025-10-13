// FILE: src/components/navigation/Navbar.jsx
// PURPOSE: Main navigation bar component

import { useNavigate, useLocation } from "react-router-dom";
import { Compass, MessageCircle, User,Search } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO + BRAND */}
          <div className="flex flex-row items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">SU</span>
            </div>
            <h1 className="text-xl font-medium text-gray-900">SkillUp</h1>
          </div>
          
          {/* NAVIGATION BUTTONS */}
          <div className="flex space-x-2">
            <button 
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg transition ${
                isActive('/discover') 
                  ? 'bg-black text-white border border-black' 
                  : 'text-black hover:text-black hover:bg-gray-200'
              }`}
              onClick={() => navigate('/discover')}
            >
              <Search className="h-4 w-4" />
              <span>Discover</span>
            </button>
            
            <button 
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg transition ${
                isActive('/messages') 
                  ? 'bg-black text-white border border-black' 
                  : 'text-black hover:text-black hover:bg-gray-200'
              }`}
              onClick={() => navigate('/messages')}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </button>
            
            <button 
              className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-lg transition ${
                isActive('/profile') 
                  ? 'bg-black text-white border border-black' 
                  : 'text-black hover:text-black hover:bg-gray-200'
              }`}
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>
          
          {/* USER AVATAR */}
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">U</span>
          </div>
          
        </div>
      </div>
    </nav>
  );
}