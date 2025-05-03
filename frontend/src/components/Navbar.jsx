import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [activeLinks, setActiveLinks] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleCloseMenu = () => setIsOpen(false);

  // Detect click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Function to handle active link
  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsOpen(false); // Close the mobile menu on link click
  };

  const handleLinkClicks = (link) => {
    setActiveLinks(link);
    setIsOpen(false); // Close the mobile menu on link click
  };

  // Check if user is logged in (by token) and set the loading state
  useEffect(() => {
    const token = localStorage.getItem('token'); // assuming token is stored in localStorage
    if (token) {
      setIsLoading(false); // User is logged in
    } else {
      setIsLoading(false); // User is not logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token'); // Check if token exists

  return (
    <div className="sticky top-0 z-50 bg-[#F2F7FF] bg-opacity-80 p-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-3">
          {!isLoading && !isLoggedIn ? (
            <>
              <ScrollLink to="home" smooth={true} duration={500} onClick={() => handleLinkClick('home')}>
                <img
                  className="h-[50px] w-[50px] object-contain rounded-full"
                  src="https://th.bing.com/th/id/OIP.Y2dAxeNpJoEBfex-qXl3UAHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
                  alt="Logo"
                />
              </ScrollLink>
              <ScrollLink to="home" smooth={true} duration={500} onClick={() => handleLinkClick('home')} className="text-2xl font-semibold text-primary-start hidden md:block">
                HeartSense.AI
              </ScrollLink>
            </>
          ) :
            <>
              <RouterLink to="/landing2" onClick={() => handleLinkClicks('home')}>
                <img
                  className="h-[50px] w-[50px] object-contain rounded-full"
                  src="https://th.bing.com/th/id/OIP.Y2dAxeNpJoEBfex-qXl3UAHaHa?w=512&h=512&rs=1&pid=ImgDetMain"
                  alt="Logo"
                />
              </RouterLink>
              <RouterLink to="/landing2" className="text-2xl font-semibold text-primary-start hidden md:block" onClick={() => handleLinkClicks('home')}>
                HeartSense.AI
              </RouterLink>
            </>}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-10 md:flex">
          {!isLoading && !isLoggedIn ? (
            <>
              <li>
                <ScrollLink to="home" smooth duration={500} className={`cursor-pointer ${activeLink === 'home' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClick('home')}>Home</ScrollLink>
              </li>
              <li>
                <ScrollLink to="about" smooth duration={500} className={`cursor-pointer ${activeLink === 'about' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClick('about')}>About</ScrollLink>
              </li>
              <li>
                <ScrollLink to="service" smooth duration={500} className={`cursor-pointer ${activeLink === 'service' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClick('service')}>Service</ScrollLink>
              </li>
              <li>
                <ScrollLink to="measure" smooth duration={500} className={`cursor-pointer ${activeLink === 'measure' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClick('measure')}>Measure</ScrollLink>
              </li>
              <li>
                <ScrollLink to="mission" smooth duration={500} className={`cursor-pointer ${activeLink === 'mission' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClick('mission')}>Mission</ScrollLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <RouterLink to="/landing2" className={`cursor-pointer ${activeLinks === 'home' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClicks('home')}>Home</RouterLink>
              </li>
              <li>
                <RouterLink to="/profile" className={`cursor-pointer ${activeLinks === 'profile' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`}
                  onClick={() => handleLinkClicks('profile')}>Profile</RouterLink>
              </li>
              <li>
                <RouterLink to="/history" className={`cursor-pointer ${activeLinks === 'history' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClicks('history')}>History</RouterLink>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Login/Logout Button */}
        {!isLoading && !isLoggedIn ? (
          <RouterLink to="/login" className="hidden md:block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-3 rounded-full text-lg font-semibold transform transition-transform duration-300 hover:scale-105">
            Login
          </RouterLink>
        ) : (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-gradient-to-r from-red-400 to-red-600 text-white px-7 py-3 rounded-full text-lg font-semibold transform transition-transform duration-300 hover:scale-105"
          >
            Logout
          </button>
        )}

        {/* Mobile Menu Icon */}
        <div className="relative md:hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <IoMdClose onClick={handleCloseMenu} className="size-7 cursor-pointer text-primary-end" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <HiMiniBars3BottomRight onClick={() => setIsOpen(true)} className="size-7 cursor-pointer text-primary-end" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute right-2 top-10 min-w-[240px] rounded-2xl border bg-white p-4 shadow-xl z-50"
              >
                <ul className="mb-4 flex flex-col items-center gap-4">
                  {!isLoading && !isLoggedIn ? (
                    <>
                      <li>
                        <ScrollLink to="home" smooth duration={500} onClick={() => handleLinkClick('home')} className={`cursor-pointer ${activeLink === 'home' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start'}`}>Home</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="about" smooth duration={500} onClick={() => handleLinkClick('about')} className={`cursor-pointer ${activeLink === 'about' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start'}`}>About</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="service" smooth duration={500} onClick={() => handleLinkClick('service')} className={`cursor-pointer ${activeLink === 'service' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start'}`}>Service</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="measure" smooth duration={500} onClick={() => handleLinkClick('measure')} className={`cursor-pointer ${activeLink === 'measure' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start'}`}>Measure</ScrollLink>
                      </li>
                      <li>
                        <ScrollLink to="mission" smooth duration={500} onClick={() => handleLinkClick('mission')} className={`cursor-pointer ${activeLink === 'mission' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start'}`}>Mission</ScrollLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <RouterLink to="/landing2" className={`cursor-pointer ${activeLinks === 'home' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClicks('home')}>Home</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/profile" className={`cursor-pointer ${activeLinks === 'profile' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`}
                          onClick={() => handleLinkClicks('profile')}>Profile</RouterLink>
                      </li>
                      <li>
                        <RouterLink to="/history" className={`cursor-pointer ${activeLinks === 'history' ? 'text-primary-start' : 'text-para opacity-80 hover:text-primary-start hover:opacity-100'}`} onClick={() => handleLinkClicks('history')}>History</RouterLink>
                      </li>
                    </>
                  )}
                </ul>

                {/* Mobile Login/Logout Button */}
                {!isLoading && !isLoggedIn ? (
                  <RouterLink to="/login" onClick={handleCloseMenu} className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-7 py-3 rounded-full text-md font-semibold">
                    Login
                  </RouterLink>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-gradient-to-r from-red-400 to-red-600 text-white px-7 py-3 rounded-full text-md font-semibold"
                  >
                    Logout
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
