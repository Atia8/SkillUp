// FILE: src/components/navigation/ResponsiveNavbar.jsx

import { useNavigate, useLocation } from "react-router-dom";
import { Search, MessageCircle, User, Menu } from "lucide-react";
import { useState, useRef, useEffect } from 'react';

export default function ResponsiveNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
 const menuRef = useRef(null); 

  const isActive = (path) => location.pathname === path;


// Detect clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);



  // Function to get current page icon and name
  const getCurrentPageInfo = () => {
    switch(location.pathname) {
      case '/discover':
      case '/':  // ← ADD THIS LINE - handle root path
        return { icon: Search, name: 'Discover' };
      case '/messages':
        return { icon: MessageCircle, name: 'Messages' };
      case '/profile':
        return { icon: User, name: 'Profile' };
      default:
        return { icon: Search, name: 'Discover' };
    }
  };

  const currentPage = getCurrentPageInfo();
  const CurrentIcon = currentPage.icon;

  return (
    <>
      {/* DESKTOP NAVIGATION - Shows on medium screens and up */}
      <nav className="hidden md:block bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* LOGO + BRAND */}
            <div className="flex flex-row items-center gap-2">
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">SU</span>
              </div>
              <h1 className="text-xl font-medium text-gray-900">SkillUp</h1>
            </div>
            
            {/* DESKTOP NAVIGATION BUTTONS */}
            <div className="flex space-x-2">
              <button 
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
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
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
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
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition ${
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
            
            {/* DESKTOP USER AVATAR */}
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
            
          </div>
        </div>
      </nav>

      {/* MOBILE NAVIGATION - Shows on small screens */}
      <nav className="md:hidden bg-white border-b border-gray-200 relative">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            
            {/* MOBILE LOGO - Smaller */}
            <div className="flex flex-row items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">SU</span>
              </div>
              {/* Show current page name next to logo on mobile */}
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-medium text-gray-900">SkillUp</h1>
                {/* <span className="text-gray-400">•</span>
                <span className="text-sm font-medium text-gray-700">{currentPage.name}</span> */}
              </div>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="flex items-center space-x-2">
              {/* Current Page Icon */}
    
              <button 
                className={`p-2 rounded-lg transition flex items-center justify-center ${
                  isActive(location.pathname) 
                    ? 'bg-black text-white font-semibold' 
                    : 'text-gray-600'
                }`}
                onClick={() => navigate(location.pathname)}
              >
                <CurrentIcon className="h-5 w-5" />
                {currentPage.name}
              </button>
            

              {/* Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg text-black hover:bg-gray-100 transition"
              >
                <Menu className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {showMobileMenu && (
                    <div 
                     ref={menuRef}
                    className=" absolute top-full right-1 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {/* // <div className="border-t border-gray-200 py-2 bg-white"> */}
              {/* Show all navigation items except the current one */}
              {location.pathname !== '/discover' && location.pathname !== '/'&& (
                <button 
                  className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => {
                    navigate('/discover');
                    setShowMobileMenu(false);
                  }}
                >
                  <Search className="h-5 w-5" />
                  <span className="font-medium">Discover</span>
                </button>
              )}
              
              {location.pathname !== '/messages' && (
                <button 
                  className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => {
                    navigate('/messages');
                    setShowMobileMenu(false);
                  }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">Messages</span>
                </button>
              )}
              
              {location.pathname !== '/profile' && (
                <button 
                  className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => {
                    navigate('/profile');
                    setShowMobileMenu(false);
                  }}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Profile</span>
                </button>
              )}

              
            </div>
             
          )}
        </div>
        
      </nav>
    </>
  );
}