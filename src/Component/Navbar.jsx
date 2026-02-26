import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../Images/dream-logo-ok.png';

const Navbar = ({ onEnquiryClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpenCourses(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="fixed top-0 left-0 w-[100px] h-auto z-[9999] pointer-events-none flex items-center justify-center ml-5">
        <img src={logo} alt="logo" className="w-[70px] h-[90px] md:w-[90px] md:h-[110px]" />
      </div>

      <nav className="fixed top-0 h-[70px] w-full bg-white flex items-center z-[40]">
        <div className='w-[30%] md:w-[25%] h-full'></div>

        <div className='hidden md:block w-[55%] h-full'>
          <ul className='text-lg text-cyan-900 flex justify-evenly items-center mt-5 font-bold'>
            <li><Link to='/' className="hover:text-red-600">Home</Link></li>
            <li><Link to='/about' className="hover:text-red-600">About Us</Link></li>
            <li className="relative cursor-pointer" onMouseLeave={() => setOpenCourses(false)}>
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
              <ul className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl transition-all duration-200 border border-gray-200 z-50 ${openCourses ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
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

        <div className='hidden md:flex w-[15%] h-full justify-center items-center'>
          <button onClick={() => onEnquiryClick?.()} className='bg-red-800 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'>Enquiry</button>
        </div>

        <div className="md:hidden w-[70%] h-full flex justify-end items-center pr-4">
          <button onClick={toggleMenu}><i className="fa-solid fa-bars text-cyan-900 text-2xl font-bold cursor-pointer"></i></button>
        </div>

        <div className="hidden md:block w-[5%] h-full"></div>

        {isMenuOpen && (
          <div className="md:hidden fixed top-[70px] left-0 w-full bg-white z-[9999] shadow-lg">
            <ul className="flex flex-col py-4">
              <li className="border-b border-gray-100">
                <Link to="/" onClick={closeMenu} className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500">Home</Link>
              </li>
              <li className="border-b border-gray-100">
                <Link to="/about" onClick={closeMenu} className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500">About Us</Link>
              </li>
              <li className="border-b border-gray-100">
                <Link to="/our-courses" onClick={closeMenu} className="w-full flex justify-between items-center px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500">Our Courses <i className={`fa-solid fa-caret-down transition-transform duration-300 ${openCourses ? 'rotate-180' : ''}`} /></Link>
                {openCourses && (
                  <ul className="bg-gray-50">
                    <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white"><Link to="/graphic-design" onClick={closeMenu}>Graphic Design</Link></li>
                    <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white"><Link to="/ui&ux-design" onClick={closeMenu}>UI / UX Design</Link></li>
                    <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white"><Link to="/video-editing" onClick={closeMenu}>Video Editing</Link></li>
                    <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white"><Link to="/digital-marketing" onClick={closeMenu}>Digital Marketing</Link></li>
                    <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white"><Link to="/graphic&videoediting" onClick={closeMenu}>Graphic Design & Video Editing</Link></li>
                  </ul>
                )}
              </li>
              {/* <li className="border-b border-gray-100 text-cyan-900 font-bold text-lg px-6 py-3">Student Corner</li> */}
              <li className="border-b border-gray-100"><Link to="/studio-division" onClick={closeMenu} className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500">Studio Division</Link></li>
              <li className="border-b border-gray-100"><Link to="/contact" onClick={closeMenu} className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500">Contact Us</Link></li>
            </ul>
          </div>
        )}

        {isMenuOpen && <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[9998] top-[70px]" onClick={closeMenu}></div>}
      </nav>
    </header>
  );
};

export default Navbar;
