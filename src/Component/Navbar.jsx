import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const logo = '/Images/dream-logo-ok.png';
const Navbar = ({ onEnquiryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpenCourses(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setOpenCourses(false);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenCourses(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="fixed top-0 left-0 w-[120px] lg:w-[100px] h-auto z-[9999] pointer-events-none flex items-center justify-center ml-1 lg:ml-6">
        <img src={logo} alt="logo" className="w-[86px] h-[102px] lg:w-[90px] lg:h-[110px] object-contain" />
      </div>

      <nav className="fixed top-0 h-[70px] w-full bg-white flex items-center z-[40]">
        <div className='w-[30%] lg:w-[25%] h-full'></div>

        <div className='hidden lg:block w-[55%] h-full'>
          <ul className='text-lg text-cyan-900 flex justify-evenly items-center mt-5 font-bold'>
            <li><Link to='/' className="hover:text-red-600">Home</Link></li>
            <li><Link to='/about' className="hover:text-red-600">About Us</Link></li>
            <li
              className="relative cursor-pointer"
              onMouseEnter={() => setOpenCourses(true)}
              onMouseLeave={() => setOpenCourses(false)}
            >
              <Link
                to="/our-courses"
                onClick={() => setOpenCourses(false)}
                className="flex items-center gap-1 hover:text-red-600"
              >
                Our Courses
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenCourses(!openCourses);
                  }}
                  className="ml-1"
                  aria-label="Toggle courses menu"
                >
                  <i className={`fa-solid fa-caret-down transition-transform duration-300 ${openCourses ? 'rotate-180' : ''}`}></i>
                </button>
              </Link>
              <ul className={`absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 bg-white rounded-xl shadow-xl transition-all duration-200 border border-gray-200 z-50 ${openCourses ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
                <li className="hover:bg-red-50 transition"><Link to="/graphic-design" onClick={() => setOpenCourses(false)} className="block px-5 py-3 text-black hover:text-red-600">Graphic Design</Link></li>
                <li className="hover:bg-red-50 transition"><Link to="/ui&ux-design" onClick={() => setOpenCourses(false)} className="block px-5 py-3 text-black hover:text-red-600">UI/UX Design</Link></li>
                <li className="hover:bg-red-50 transition"><Link to="/video-editing" onClick={() => setOpenCourses(false)} className="block px-5 py-3 text-black hover:text-red-600">Video Editing</Link></li>
                <li className="hover:bg-red-50 transition"><Link to="/digital-marketing" onClick={() => setOpenCourses(false)} className="block px-5 py-3 text-black hover:text-red-600">Digital Marketing</Link></li>
                <li className="hover:bg-red-50 transition rounded-b-xl"><Link to="/graphic&videoediting" onClick={() => setOpenCourses(false)} className="block px-5 py-3 text-black hover:text-red-600">Graphic Design & Video Editing</Link></li>
              </ul>
            </li>
            {/* <li className="hover:text-red-600">Student Corner</li> */}
            <li><Link to='/studio-division' className="hover:text-red-600">Studio Division</Link></li>
            <li><Link to='/contact' className="hover:text-red-600">Contact Us</Link></li>
          </ul>
        </div>

        <div className='hidden lg:flex w-[15%] h-full justify-center items-center'>
          <button onClick={() => onEnquiryClick?.()} className='bg-red-800 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'>Enquiry</button>
        </div>

        <div className="lg:hidden w-[70%] h-full flex justify-end items-center pr-4">
          <button onClick={toggleMenu}><i className="fa-solid fa-bars text-cyan-900 text-2xl font-bold cursor-pointer"></i></button>
        </div>

        <div className="hidden lg:block w-[5%] h-full"></div>

        {isMenuOpen && (
          <div className="lg:hidden fixed top-[70px] left-0 w-full z-[9999] px-3 pt-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
              <ul className="max-h-[calc(100vh-95px)] overflow-y-auto py-2">
                <li className="border-b border-slate-100">
                  <Link to="/" onClick={closeMenu} className="block px-5 py-3 text-slate-800 font-semibold text-[17px] hover:bg-slate-50 hover:text-red-600 transition-colors">Home</Link>
                </li>
                <li className="border-b border-slate-100">
                  <Link to="/about" onClick={closeMenu} className="block px-5 py-3 text-slate-800 font-semibold text-[17px] hover:bg-slate-50 hover:text-red-600 transition-colors">About Us</Link>
                </li>
                <li className="border-b border-slate-100">
                  <div className="w-full flex justify-between items-center px-5 py-3 hover:bg-slate-50 transition-colors">
                    <Link
                      to="/our-courses"
                      onClick={closeMenu}
                      className="text-slate-800 font-semibold text-[17px] hover:text-red-600 transition-colors"
                    >
                      Our Courses
                    </Link>
                    <button
                      type="button"
                      onClick={() => setOpenCourses(!openCourses)}
                      className="w-8 h-8 rounded-md text-slate-700 hover:text-red-600 hover:bg-slate-100 transition-colors flex items-center justify-center"
                      aria-label="Toggle courses submenu"
                      aria-expanded={openCourses}
                      aria-controls="mobile-courses-submenu"
                    >
                      <i className={`fa-solid fa-caret-down transition-transform duration-300 ${openCourses ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {openCourses && (
                    <ul id="mobile-courses-submenu" className="mx-3 mb-3 rounded-xl border border-slate-200 bg-white overflow-hidden">
                      <li className="border-b border-slate-100"><Link to="/graphic-design" onClick={closeMenu} className="block px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors">Graphic Design</Link></li>
                      <li className="border-b border-slate-100"><Link to="/ui&ux-design" onClick={closeMenu} className="block px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors">UI / UX Design</Link></li>
                      <li className="border-b border-slate-100"><Link to="/video-editing" onClick={closeMenu} className="block px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors">Video Editing</Link></li>
                      <li className="border-b border-slate-100"><Link to="/digital-marketing" onClick={closeMenu} className="block px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors">Digital Marketing</Link></li>
                      <li><Link to="/graphic&videoediting" onClick={closeMenu} className="block px-4 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors">Graphic Design & Video Editing</Link></li>
                    </ul>
                  )}
                </li>
                {/* <li className="border-b border-gray-100 text-cyan-900 font-bold text-lg px-6 py-3">Student Corner</li> */}
                <li className="border-b border-slate-100"><Link to="/studio-division" onClick={closeMenu} className="block px-5 py-3 text-slate-800 font-semibold text-[17px] hover:bg-slate-50 hover:text-red-600 transition-colors">Studio Division</Link></li>
                <li><Link to="/contact" onClick={closeMenu} className="block px-5 py-3 text-slate-800 font-semibold text-[17px] hover:bg-slate-50 hover:text-red-600 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        )}

        {isMenuOpen && <div className="lg:hidden fixed inset-0 bg-slate-900/35 backdrop-blur-[1px] z-[9998] top-[70px]" onClick={closeMenu}></div>}
      </nav>
    </header>
  );
};

export default Navbar;





