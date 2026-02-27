import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../Images/dream-logo-ok.png';

const Footer = () => {
  return (
    <div className="w-[92%] mx-auto min-h-[360px] px-0 mt-10">
      <div className="w-full h-[30px]"><hr className="border-slate-700 w-full mt-7" /></div>

      <div className="w-full flex flex-col items-start gap-5 md:flex-row md:justify-center md:items-start md:gap-7 md:px-1">
        <div className="w-full md:w-[240px] mt-4">
          <div className="flex justify-start md:justify-center">
            <img src={logo1} alt="logo" className="w-[70px] h-[90px] md:w-[100px] md:h-[134px] md:mt-[10px]" />
          </div>
          <div className="flex mt-6">
            <div className="w-full h-[50px] flex gap-3 items-center justify-start md:justify-center">
              <Link to="https://www.linkedin.com/company/dreamanimex" className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"><i className="fa-brands fa-linkedin-in text-white text-xl"></i></Link>
              <Link to="https://www.instagram.com/dreamanimex/" className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"><i className="fa-brands fa-instagram text-xl text-white"></i></Link>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info.dreamanimex@gmail.com" target="_blank" rel="noopener noreferrer" className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"><i className="fa-regular fa-envelope text-white text-xl"></i></a>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[240px] mt-4">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Quick Links</h3>
          <ul className="text-white text-lg leading-7 ml-2">
            <li className="mb-2">
              <Link to="/" className="hover:text-red-400 transition-colors cursor-pointer">Home</Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="hover:text-red-400 transition-colors cursor-pointer">About Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/our-courses" className="hover:text-red-400 transition-colors cursor-pointer">Our Courses</Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="hover:text-red-400 transition-colors cursor-pointer">Contact Us</Link>
            </li>
            <li className="mb-2">
              <Link to="/studio-division" className="hover:text-red-400 transition-colors cursor-pointer">Studio Division</Link>
            </li>
          
          </ul>
        </div>

        <div className="w-full md:w-[240px] mt-4">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Our Courses</h3>
          <ul className="text-white text-lg leading-7 ml-2">
            <li className="mb-2">
              <Link to="/graphic-design" className="hover:text-red-400 transition-colors cursor-pointer">Graphic Design</Link>
            </li>
            <li className="mb-2">
              <Link to="/video-editing" className="hover:text-red-400 transition-colors cursor-pointer">Video Editing</Link>
            </li>
            <li className="mb-2">
              <Link to="/ui&ux-design" className="hover:text-red-400 transition-colors cursor-pointer">UI/UX Design</Link>
            </li>
            <li className="mb-2">
              <Link to="/digital-marketing" className="hover:text-red-400 transition-colors cursor-pointer">Digital Marketing</Link>
            </li>
            <li className="mb-2">
              <Link to="/graphic&videoediting" className="hover:text-red-400 transition-colors cursor-pointer">Graphic + Video Editing</Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-[300px] mt-4 p-0">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">Contact Us</h3>
          <div className="flex items-start mb-3 ml-2">
            <i className="fa-solid fa-envelope text-2xl text-white mt-1"></i>
            <p className="text-white ml-5 break-all mt-1"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info.dreamanimex@gmail.com" className="hover:text-red-400 transition-colors underline">info.dreamanimex@gmail.com</a></p>
          </div>
          <div className="flex items-start mb-3 ml-2">
            <i className="fa-brands fa-instagram text-2xl text-white mt-1"></i>
            <p className="text-white ml-5 break-all mt-2"><a href="https://www.instagram.com/dreamanimex/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors underline">instagram.com/dreamanimex</a></p>
          </div>
          <div className="flex items-start mb-3 ml-2">
            <i className="fa-brands fa-linkedin-in text-2xl text-white mt-1"></i>
            <p className="text-white ml-5 mt-2 break-all"><a href="https://www.linkedin.com/company/dreamanimex/" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors underline">linkedin.com/company/dreamanimex</a></p>
          </div>
          <div className="flex items-start mb-3 ml-2">
            <i className="fa-solid fa-phone text-2xl text-white mt-1"></i>
            <p className="text-white ml-5 hover:text-red-400 transition-colors mt-2">+91 9888695595</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <hr className="border-slate-700 w-full" />
        <p className="text-white text-center text-sm mt-3 py-4" style={{ fontFamily: 'Playwrite NZ Basic, cursive' }}>© Dream Animex 2026 All rights reserved. Site Developed by <Link to='https://www.rudrakshcreation.com'  className='hover:text-red-400 transition-colors'>Rudraksh Creation</Link></p>
      </div>
    </div>
  );
};

export default Footer;
