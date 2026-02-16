import React, { useState, useEffect } from "react";


import { Link } from 'react-router-dom';
import logo1 from '../Images/dream-anim-logo.png'

import logo7 from '../Images/graphic des.jpg'
import logo11 from '../Images/about1.jpg'
import logo3 from '../Images/video edt.jpg'
import logo4 from '../Images/uiux.jpg'
import logo5 from '../Images/digitalmark1.jpg'
import logo6 from '../Images/uiandgraphic.jpg'
import logo9 from '../Images/page-background.JPG'
import logo13 from '../Images/faq1.jpg'

import {FaPlus} from "react-icons/fa";
import {FaMinus} from "react-icons/fa";
import img1 from "../Images/img1.png";
import img2 from '../Images/img2.png';
import img3 from '../Images/img3.png';
import img4 from '../Images/img4.png';

const Index = () => {
   const [openIndex, setOpenIndex] = useState(null);
const [hoverIndex, setHoverIndex] = useState(false);

 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [current, setCurrent] = useState(0);

  // State for Enquiry Popup
  const [showPopup, setShowPopup] = useState(false);

  // Effect to show popup only on initial site visit (new tab/window)
  useEffect(() => {
  if (typeof window !== "undefined") {
    const hasPopupShown = sessionStorage.getItem("enquiryPopupShown");

    if (hasPopupShown !== "true") {
      setShowPopup(true);
      sessionStorage.setItem("enquiryPopupShown", "true");
    }
  }
}, []);

        const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const images = [img1,img2,img3,img4]; // 👈 sabse upar

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);


  return (
   <div className="w-full">

 <div className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:min-h-screen  "
  style={{ backgroundImage: `url(${logo9})`  }}  >
   
<header className="fixed top-0 left-0 w-full z-50">
  {/* Logo - Visible on both mobile and desktop */}
  <div className="fixed top-0 left-0 w-[100px] h-auto z-[9999] pointer-events-none flex items-center justify-center">
   <img
  src={logo1}
  alt="logo"
  className="w-[70px] h-[90px] md:w-[90px] md:h-[110px]"
  style={{
    filter:
      "drop-shadow(0 0 30px white) drop-shadow(0 0 60px white) drop-shadow(0 0 100px rgba(255,255,255,0.9))",
  }}
/>
   
  </div>

  {/* Navigation */}
  <nav className="fixed top-0 h-[70px] w-full bg-white flex items-center z-[40]">
    {/* Left spacer - Different sizes for mobile vs desktop */}
    <div className='w-[30%] md:w-[25%] h-full'></div>
    
    {/* Navigation Menu - Hidden on mobile, visible on desktop */}
    <div className='hidden md:block w-[55%] h-full'>
      <ul className='text-lg text-cyan-900 flex justify-evenly items-center mt-5 font-bold' style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
        <li>
          <Link to='/' className="hover:text-red-600 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link to='/about' className="hover:text-red-600 transition-colors">
            About Us
          </Link>
        </li>
          <li>
            <Link to='/courses' className="hover:text-red-600 transition-colors">
            Our Courses
          </Link>
          </li>
        <li className="hover:text-red-600 transition-colors">
            Student Corner
                 </li>
        <li>
          <Link to='/studio-division' className="hover:text-red-600 transition-colors">
            Studio Division
          </Link>
        </li>
        <li>
          <Link to='/contact' className="hover:text-red-600 transition-colors">
            Contact Us
          </Link>
        </li>
      </ul>
    </div> 
    
    {/* Enquire Button - Hidden on mobile, visible on desktop */}
    <div className='hidden md:flex w-[15%] h-full justify-center items-center'>
      <button 
        onClick={() => setShowPopup(true)}
        className='bg-red-600 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-colors'
      >
        Enquiry
      </button>
    </div>
    
    {/* Menu Icon - ONLY on mobile */}
   {/* Mobile Bars Icon */}
<div className="md:hidden w-[70%] h-full flex justify-end items-center pr-4">
  <button onClick={toggleMenu}>
    <i className="fa-solid fa-bars text-cyan-900 text-2xl font-bold cursor-pointer"></i>
  </button>
</div>

{/* Desktop spacer */}
<div className="hidden md:block w-[5%] h-full"></div>

{/* Mobile Dropdown Menu */}
{isMenuOpen && (
  <div className="md:hidden fixed top-[70px] left-0 w-full bg-white z-[9999] shadow-lg">
    <ul className="flex flex-col py-4">

      <li className="border-b border-gray-100">
        <Link
          to="/"
          onClick={closeMenu}
          className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500"
        >
          Home
        </Link>
      </li>

      <li className="border-b border-gray-100">
        <Link
          to="/about"
          onClick={closeMenu}
          className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500"
        >
          About Us
        </Link>
      </li>

      <li className="border-b border-gray-100">
        <Link
          to="/courses"
          onClick={closeMenu}
          className="flex justify-between items-center px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500"
        >
          Our Courses
        </Link>
      </li>

      <li className="border-b border-gray-100">
        <Link
          to="/student-corner"
          onClick={closeMenu}
          className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500"
        >
          Student Corner
        </Link>
      </li>

      <li className="border-b border-gray-100">
        <Link
          to="/studio-division"
          onClick={closeMenu}
          className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500"
        >
          Studio Division
        </Link>
      </li>

      <li className="border-b border-gray-100">
        <Link
          to="/contact"
          onClick={closeMenu}
          className="block px-6 py-3 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500"
        >
          Contact Us
        </Link>
      </li>

    </ul>
  </div>
)}

{/* Overlay */}
{isMenuOpen && (
  <div
    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[9998] top-[70px]"
    onClick={closeMenu}
  ></div>
)}
</nav>
</header>
<div className="w-full aspect-[16/9] md:aspect-[21/9] mt-[70px]  overflow-hidden relative">
  {images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt=""
      className={`w-full h-full absolute
       
        transition-opacity duration-1000
        ${index === current ? "opacity-100" : "opacity-0"}
      `}
    />
  ))}
</div>


         <div className='w-full h-24  flex justify-center items-center'>
  
    <h2 className="text-[#24707f] text-5xl font-bold text-center" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>COURSES</h2>
 
</div>

{/* Fixed WhatsApp Button */}
<div className='fixed right-6 top-[650px] z-50 '>
  <Link to='https://wa.me/919888695595'>
  <div className='w-[40px] h-[40px] border border-white rounded-lg bg-white flex justify-center items-center '>
    <i className="fa-brands fa-whatsapp text-3xl text-green-500 "></i>
  </div>
  </Link>
</div>

        
 <div className='w-full h-auto  top-[664px] left-0 '>
  <div className='w-full h-auto  flex flex-col p-3 gap-8 justify-center items-center md:flex-row md:gap-14 md:p-3'>
    {/* First row */}
     <div className='w-full md:w-[24%] h-auto  mb-4 md:mb-0 '>
      <div className='w-full h-[200px] md:h-[36%] rounded-2xl'>
        <img src={logo7} alt='' className='w-full h-full rounded-2xl object-cover'/>
      </div>
      <div className='w-full h-auto min-h-[50px] md:h-[12%] border-[1px] border-solid border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center mt-2 p-2'>
        <h3 className='text-white text-lg md:text-3xl font-bold text-center'>Graphic Design</h3>
      </div>
      <div className='w-full h-auto md:h-[33%] mt-1'>
        <p className='text-white text-center p-4 md:p-8 md:pt-3 text-lg md:text-lg'>Graphic design is the visual communication of ideas through typography, imagery, and color, focusing on balancing aesthetics with functionality.</p>
      </div>
      <div className="w-full h-auto md:h-[16%] flex justify-center items-center py-4 md:py-0">
  <Link to="/graphic-design">
    <button
      className=" text-white  border border-white px-8 md:px-14 py-2 md:py-2 rounded-full text-sm md:text-lg font-semibold  bg-yellow-500 hover:bg-yellow-600  hover:scale-105  transition-all  duration-300  shadow-md "
    >
      Read More
    </button>
  </Link>
</div>

    </div>
    
     <div className='w-full md:w-[24%] h-auto  mb-4 md:mb-0 '>
      <div className='w-full h-48 md:h-[36%] rounded-2xl'>
        <img src={logo3} alt='' className='w-full h-full rounded-2xl object-cover'/>
      </div>
      <div className='w-full h-auto min-h-[60px] md:h-[12%] border-[1px] border-solid border-red-500 rounded-full bg-[#6C757D] flex justify-center items-center mt-2 p-2'>
        <h3 className='text-white text-lg md:text-3xl font-bold text-center'>Video Editing</h3>
      </div>
      <div className='w-full h-auto md:h-[33%] mt-1'>
        <p className='text-white text-center p-4 md:p-6 md:pt-2 text-lg md:text-lg'>Video editing involves manipulating video and audio to create a compelling narrative, utilizing techniques like B-roll for context, color correction for consistency, and cutting to pacing.</p>
      </div>
     <div className="w-full h-auto md:h-[16%] flex justify-center items-center py-4 md:py-0">
  <Link to="/video-editing">
    <button
      className=" text-white  border border-white px-8 md:px-14 py-2 md:py-2 rounded-full text-sm md:text-lg font-semibold  bg-red-500 hover:bg-yellow-600  hover:scale-105  transition-all  duration-300  shadow-md "
    >
      Read More
    </button>
  </Link>
</div>
    </div> 
    
     <div className='w-full md:w-[24%] h-auto  mb-4 md:mb-0'>
      <div className='w-full h-48 md:h-[36%] rounded-2xl'>
        <img src={logo4} alt='' className='w-full h-full rounded-2xl object-cover'/>
      </div>
      <div className='w-full h-auto min-h-[60px] md:h-[12%] border-[1px] border-solid border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center mt-2 p-2'>
        <h3 className='text-white text-lg md:text-3xl font-bold text-center'>UI & UX Design</h3>
      </div>
      <div className='w-full h-auto md:h-[33%] mt-1'>
        <p className='text-white text-center p-4 md:p-6 md:pt-2 text-lg md:text-lg'>UI/UX design focuses on creating intuitive, user-centered digital experiences where functionality meets aesthetics. </p>
      </div>
      <div className='w-full h-auto md:h-[16%] flex justify-center items-center py-4 md:py-0'>
         <Link to="/ui&ux-design">
    <button
      className=" text-white  border border-white px-8 md:px-14 py-2 md:py-2 rounded-full text-sm md:text-lg font-semibold  bg-yellow-500 hover:bg-yellow-600  hover:scale-105  transition-all  duration-300  shadow-md "
    >
      Read More
      </button>
      </Link>
      </div>
    </div>
  </div> 

  {/* Second row */}
   <div className='w-full h-auto  flex flex-col p-3 gap-8 justify-center items-center md:flex-row md:gap-14 md:p-2'>
    <div className='w-full md:w-[24%] h-auto  mb-4 md:mb-0'>
      <div className='w-full h-48 md:h-[36%] rounded-2xl'>
        <img src={logo5} alt='' className='w-full h-full rounded-2xl object-cover'/>
      </div>
      <div className='w-full h-auto min-h-[60px] md:h-[12%] border-[1px] border-solid border-red-500 rounded-full bg-[#6C757D] flex justify-center items-center mt-2 p-2'>
        <h3 className='text-white text-lg md:text-2xl font-bold text-center'>Digital Marketing</h3>
      </div>
      <div className='w-full h-auto md:h-[33%] mt-1'>
        <p className='text-white text-center p-4 md:p-6 md:pt-2 text-lg md:text-lg'>Digital marketing combines creativity with technology, using data-driven strategies—SEO, social media, and content—to connect directly with audiences. </p>
      </div>
      <div className="w-full h-auto md:h-[16%] flex justify-center items-center py-4 md:py-0">
  <Link to="/digital-marketing">
    <button
      className=" text-white  border border-white px-8 md:px-14 py-2 md:py-2 rounded-full text-sm md:text-lg font-semibold  bg-red-500 hover:bg-yellow-600  hover:scale-105  transition-all  duration-300  shadow-md "
    >
      Read More
    </button>
  </Link>
</div>
    </div>
     
     <div className='w-full md:w-[24%] h-auto  mb-4 md:mb-0'>
      <div className='w-full h-48 md:h-[36%] rounded-2xl'>
        <img src={logo6} alt='' className='w-full h-full rounded-2xl object-cover'/>
      </div>
      <div className='w-full h-auto min-h-[60px] md:h-[12%] border-[1px] border-solid border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center mt-2 p-2'>
        <h3 className='text-white text-lg md:text-xl font-bold text-center'>Graphic Design and UI/UX Design</h3>
      </div>
      <div className='w-full h-auto md:h-[33%] mt-1'>
        <p className='text-white text-center p-4 md:p-6 md:pt-1 text-lg md:text-lg'>Graphic and UI/UX design focuses on merging aesthetics with functionality, aiming to create intuitive, user-centered experiences.</p>
      </div>
      <div className='w-full h-auto md:h-[16%] flex justify-center items-center py-4 md:py-0'>
         <Link to="/graphic&uiux">
    <button
      className=" text-white  border border-white px-8 md:px-14 py-2 md:py-2 rounded-full text-sm md:text-lg font-semibold  bg-yellow-500 hover:bg-yellow-600  hover:scale-105  transition-all  duration-300  shadow-md "
    >
      Read More
      </button>
      </Link>
      </div>
    </div>
  </div>
</div>  
     <div className="w-full h-auto md:h-[580px] flex flex-col md:flex-row">
  
  {/* Text Section – TOP on mobile, LEFT on desktop */}
  <div className="w-full md:w-1/2 h-auto md:h-full order-1 md:order-1">
  <div className="w-[140px] h-[30px] bg-white text-lg mt-8 md:mt-6 ml-4 md:ml-16 text-center">
    <h3>Why Choose Us</h3>
  </div>

  <h2 className="text-white text-2xl md:text-4xl mt-6 md:mt-6 ml-4 md:ml-16 font-bold">
    The Choice Of Future Professionals
  </h2>

  <p className="text-white text-xl md:text-base mt-6 md:mt-6 ml-4 md:ml-16">
    Dream Academy enables you to learn from industry experts with hands-on training,
    cutting-edge tools, and real-world projects. We offer career-focused programs in
    Graphic Design, Video Editing, UI/UX Design, and Digital Marketing for a successful
    creative future.
  </p>

  {/* POINTS LIST */}
  <ul className="text-white text-base md:text-lg mt-6 md:mt-6 ml-6 md:ml-20 list-disc space-y-2">
    <li>Live mentor-led classes</li>
    <li>Practical project-based learning</li>
    <li>Portfolio-focused training</li>
    <li>Beginner-friendly approach</li>
    <li>Career & freelancing guidance</li>
    <li>Flexible learning from home</li>
  </ul>

  <Link to="/about">
    <button className="rounded-full bg-red-500 text-white text-base md:text-lg mt-6 md:mt-8 ml-4 md:ml-16 px-4 md:px-5 py-2 mb-8">
      Read More
    </button>
  </Link>
</div>


  {/* Image Section – BOTTOM on mobile, RIGHT on desktop */}
  <div className="w-full md:w-1/2 h-auto md:h-full order-2 md:order-2 flex justify-center items-center mt-8 md:mt-0">
    <img 
      src={logo11} 
      alt="Animation Visual" 
      className="w-[90%] md:w-[80%] h-auto md:h-[80%] rounded-2xl scale-105 hover:scale-110 transition-transform duration-700"
    />
  </div>

</div>
          
          <div className='w-full h-auto  md:h-[500px]  flex flex-col md:flex-row'>
             <div className='w-full md:w-[30%] h-auto md:h-full flex justify-center items-center py-6 md:py-0'>
                  <img src={logo13} alt='' className='w-[260px] h-[300px] md:w-[340px] md:h-[380px] rounded-2xl scale-105 hover:scale-110 transition-transform duration-700'/>
             </div>
             <div className='w-full md:w-[70%] h-auto md:h-full '>
                 <div className='w-full h-auto md:h-[24%] '>
                   <div className="bg-white text-black w-[50px] h-[45px] rounded-lg 
        flex justify-center items-center text-lg ml-4 md:ml-20 mt-2">
                          FAQ
                        </div>
                         <h3 className="text-2xl md:text-5xl text-white font-bold ml-4 md:ml-20 mt-2" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
                            Frequently Asked Questions
                          </h3>
                 </div>
                  <div className='w-full h-auto md:h-[75%] mt-4 md:mt-0 '>
                      <div className={`w-full relative py-2 cursor-pointer transition-colors duration-300 mt-1
    ${
      hoverIndex === 0 && openIndex !== 0
        ? "text-blue-400"
        : openIndex === 0 && hoverIndex === 0
        ? "text-blue-400"
        : "text-white"
    }`}
  onMouseEnter={() => setHoverIndex(0)}
  onMouseLeave={() => setHoverIndex(null)}
  onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
>
  {/* Question */}
  <p className="text-base md:text-xl ml-5 md:ml-20 pr-10">
    01. What programs are available at Reliance Animation Academy?
  </p>

  {/* Icon */}
  <span
    className={`absolute right-2 md:right-14 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 0 && openIndex !== 0
          ? "text-blue-400"
          : openIndex === 0 && hoverIndex === 0
          ? "text-blue-400"
          : "text-white"
      }`}
  >
    {openIndex === 0 ? <FaMinus /> : <FaPlus />}
  </span>

  {/* Answer */}
  {openIndex === 0 && (
    <p
      className="text-sm md:text-xl ml-5 md:ml-20 mt-2 leading-relaxed text-white"
      onMouseEnter={() => setHoverIndex(null)} // 👈 answer par hover → question white
    >
      We offer degree, diploma, and certificate programs in Animation, VFX,
      Motion Graphics, Game Design, Web/UI-UX, Graphic Design, and Digital Editing.
    </p>
  )}

  <hr className="border-stone-400 w-full md:w-[92%] ml-0 md:ml-20 mt-3" />
</div>
     <div
  className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 1
        ? "text-blue-400"
        : "text-white"
    }`}
  onMouseEnter={() => setHoverIndex(1)}
  onMouseLeave={() => setHoverIndex(null)}
  onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
>
  {/* Question */}
  <p className="text-base md:text-xl ml-5 md:ml-20 pr-10">
    02. What is the eligibility for these programs?
  </p>

  {/* Icon */}
  <span
    className={`absolute right-2 md:right-14 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 1
          ? "text-blue-400"
          : "text-white"
      }`}
  >
    {openIndex === 1 ? <FaMinus /> : <FaPlus />}
  </span>

  {/* Answer */}
  {openIndex === 1 && (
    <p
      className="text-sm md:text-xl ml-5 md:ml-20 mt-2 leading-relaxed text-white"
      onMouseEnter={() => setHoverIndex(null)}
    >
      The programs are open to students who have completed their 10+2 or equivalent.
      At the point when a student is promoted to an advanced or master’s program,
      basic computer knowledge and an interest in being creative are recommended.
    </p>
  )}

  <hr className="border-stone-400 w-full md:w-[92%] ml-0 md:ml-20 mt-3" />
</div>
      <div
  className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 2
        ? "text-blue-400"
        : "text-white"
    }`}
  onMouseEnter={() => setHoverIndex(2)}
  onMouseLeave={() => setHoverIndex(null)}
  onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
>
  {/* Question */}
  <p className="text-base md:text-xl ml-5 md:ml-20 pr-10">
   03. Are the courses beginner-friendly?
  </p>

  {/* Icon */}
  <span
    className={`absolute right-2 md:right-14 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 2
          ? "text-blue-400"
          : "text-white"
      }`}
  >
    {openIndex === 2 ? <FaMinus /> : <FaPlus />}
  </span>

  {/* Answer */}
  {openIndex === 2 && (
    <p
      className="text-sm md:text-xl ml-5 md:ml-20 mt-2 leading-relaxed text-white"
      onMouseEnter={() => setHoverIndex(null)}
    >
      Yes, our programs are designed for beginners as well as advanced learners, and students are guided through steps, receive practical training, and work in real-world projects.
    </p>
  )}

  <hr className="border-stone-400 w-full md:w-[92%] ml-0 md:ml-20 mt-3" />
</div>
          <div
  className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 3
        ? "text-blue-400"
        : "text-white"
    }`}
  onMouseEnter={() => setHoverIndex(3)}
  onMouseLeave={() => setHoverIndex(null)}
  onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
>
  {/* Question */}
  <p className="text-base md:text-xl ml-5 md:ml-20 pr-10">
   04. What tools and software will I learn?
  </p>

  {/* Icon */}
  <span
    className={`absolute right-2 md:right-14 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 3
          ? "text-blue-400"
          : "text-white"
      }`}
  >
    {openIndex === 3 ? <FaMinus /> : <FaPlus />}
  </span>

  {/* Answer */}
  {openIndex === 3 && (
    <p
      className="text-sm md:text-xl ml-5 md:ml-20 mt-2 leading-relaxed text-white"
      onMouseEnter={() => setHoverIndex(null)}
    >
     Students use industry-standard software such as Autodesk Maya, Adobe Creative Suite, Nuke, and Unreal Engine, which prepares them for industry readiness.
    </p>
  )}

  <hr className="border-stone-400 w-full md:w-[92%] ml-0 md:ml-20 mt-3" />
</div>
                       <div
  className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 4
        ? "text-blue-400"
        : "text-white"
    }`}
  onMouseEnter={() => setHoverIndex(4)}
  onMouseLeave={() => setHoverIndex(null)}
  onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
>
  {/* Question */}
  <p className="text-base md:text-xl ml-5 md:ml-20 pr-10">
   05. Can I take a part-time or online course?
  </p>

  {/* Icon */}
  <span
    className={`absolute right-2 md:right-14 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 4
          ? "text-blue-400"
          : "text-white"
      }`}
  >
    {openIndex === 4 ? <FaMinus /> : <FaPlus />}
  </span>

  {/* Answer */}
  {openIndex === 4 && (
    <p
      className="text-sm md:text-xl ml-5 md:ml-20 mt-2 leading-relaxed text-white"
      onMouseEnter={() => setHoverIndex(null)}
    >
    Yes. We have flexible learning options, so you can either study full-time, part-time, or take a blended online option for your program to fit your learning needs.
    </p>
  )}

  <hr className="border-stone-400 w-full md:w-[92%] ml-0 md:ml-20 mt-3" />
</div>    
                  </div>
             </div>
          </div>

    <div className="w-full min-h-[360px] px-4 md:px-0 mt-10">
             <div className="w-full h-[30px]">
               <hr className="border-slate-700 w-full md:w-[88%] mt-7 md:ml-24" />
             </div>
   
             <div className="w-full flex flex-col items-start md:flex-row md:justify-between md:items-start md:h-[250px] md:px-20">
               {/* Logo + Social */}
               <div className="w-full md:w-[280px] mb-0 md:mb-0 mt-4">
                 <div className="flex justify-start md:justify-center">
                <img
  src={logo1}
  alt="logo"
  className="w-[70px] h-[90px] md:w-[90px] md:h-[110px]"
  style={{
    filter:
      "drop-shadow(0 0 30px white) drop-shadow(0 0 60px white) drop-shadow(0 0 100px rgba(255,255,255,0.9))",
  }}
/>
                 </div>
                 <div className="flex mt-6">
                   <div className="w-full h-[50px] flex gap-3 items-center justify-start md:justify-center">
                     <Link
                       to="https://www.linkedin.com/company/dreamanimex"
                      
                       className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"
                     >
                       <i className="fa-brands fa-linkedin-in text-white text-xl"></i>
                     </Link>
                     <Link
                       to="https://www.instagram.com/dreamanimex/"
                       
                       className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"
                     >
                       <i className="fa-brands fa-instagram text-xl text-white"></i>
                     </Link>
                     <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=info.dreamanimex@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"
>
  <i className="fa-regular fa-envelope text-white text-xl"></i>
</a>
                   </div>
                 </div>
               </div>
   
               {/* Quick Links */}
               <div className="w-full md:w-[260px] pl-4 mt-4">
                 <h3 className="text-white text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>Quick Links</h3>
                 <ul className="text-white text-lg leading-7">
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Home</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">About Us</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Our Courses</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Contact Us</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Studio Division</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Student Corner</li>
                 </ul>
               </div>
   
               {/* Courses */}
               <div className="w-full md:w-[260px] pl-4 mt-4">
                 <h3 className="text-white text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>Our Courses</h3>
                 <ul className="text-white text-lg leading-7">
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Graphic Design</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Video Editing</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">UI/UX Design</li>
                   <li className="hover:text-red-400 transition-colors cursor-pointer mb-2">Digital Marketing</li>
                 </ul>
               </div>
   
               {/* Contact */}
               <div className="w-full md:w-[405px] mt-4 p-2">
                 <h3 className="text-white text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>Contact Us</h3>
                 <div className="flex items-start mb-3">
                   <i className="fa-solid fa-envelope text-2xl text-white mt-1"></i>
                    <p className="text-white ml-5 break-all">
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=info.dreamanimex@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline"
  >
    info.dreamanimex@gmail.com
  </a>
</p>
                 </div>
                 <div className="flex items-start mb-3">
                   <i className="fa-brands fa-instagram text-2xl text-white mt-1"></i>
                   <p className="text-white ml-5 break-all mt-2">
  <a
    href="https://www.instagram.com/dreamanimex/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline"
  >
   instagram.com/dreamanimex
  </a>
</p>
                 </div>
                 <div className="flex items-start mb-3">
                   <i className="fa-brands fa-linkedin-in text-2xl text-white mt-1"></i>
                   <p className="text-white ml-5 break-all mt-2">
  <a
    href=" https://www.linkedin.com/company/dreamanimex/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline "
  >
    linkedin.com/company/dreamanimex
  </a>
</p>
                 </div>
                 <div className="flex items-start mb-3">
                   <i className="fa-solid fa-phone text-2xl text-white mt-1"></i>
                   <p className="text-white ml-5 hover:text-red-400 transition-colors">
                     9888695595
                   </p>
                 </div>
               </div>
             </div>
   
             {/* Copyright */}
             <div className="w-full mt-10">
               <hr className="border-slate-700 w-full md:w-[88%] md:ml-24" />
               <p className="text-white text-center text-base mt-3 py-4" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
                 © Dream Animex Academy 2026 All rights reserved.
               </p>
             </div>
           </div>

      {/* Enquiry Popup Modal with Validation */}
      {showPopup && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-[9999]"
            onClick={() => setShowPopup(false)}
          ></div>
          
          {/* Popup Content */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-[10000] w-[90%] max-w-md p-6 md:p-8">
            <h3 className="text-2xl font-bold text-cyan-900 mb-4" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
              Enquiry Now
            </h3>
            
            {/* Simple Form with validation on submit only */}
            <SimpleEnquiryForm onClose={() => setShowPopup(false)} />
          </div>
        </>
      )}
       </div>
  
</div>
     
    )
}

// Simple form component with validation on submit only
const SimpleEnquiryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course:'',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
      newErrors.phone = 'Please enter 10 digits';
    }
     if(!formData.course.trim()){
      newErrors.course = 'Course is required';
     }
    else if (!/^[^\s@]+$/.test(formData.course)) {
      newErrors.course = 'Please enter a valid course';
    }
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // No errors - submit form
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
      onClose(); // Close popup
    } else {
      // Show errors
      setErrors(newErrors);
      setShowErrors(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none
            ${showErrors && errors.name 
              ? "border-red-500" 
              : "border-gray-300 focus:border-red-500"}`}
        />
        {showErrors && errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none
            ${showErrors && errors.email 
              ? "border-red-500" 
              : "border-gray-300 focus:border-red-500"}`}
        />
        {showErrors && errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your contact number"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none
            ${showErrors && errors.phone 
              ? "border-red-500" 
              : "border-gray-300 focus:border-red-500"}`}
        />
        {showErrors && errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
        )}
      </div>
         {/* Course Field */}
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="course">
    Course <span className="text-red-500">*</span>
  </label>

  <select
    id="course"
    value={formData.course}
    onChange={handleChange}
    className={`w-full px-3 py-2 border rounded-lg focus:outline-none
      ${showErrors && errors.course
        ? "border-red-500"
        : "border-gray-300 focus:border-red-500"}`}
  >
    <option value="">Select a course</option>
    <option value="Graphic Design">Graphic Design</option>
    <option value="UI/UX Design">UI / UX Design</option>
    <option value="Digital Marketing">Digital Marketing</option>
    <option value="Graphic + UI/UX Design">
      Graphic Design + UI / UX Design
    </option>
    <option value="Video Editing">Video Editing</option>
  </select>

  {showErrors && errors.course && (
    <p className="text-red-500 text-sm mt-1">{errors.course}</p>
  )}
</div>

      {/* Message Field */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows="3"
          value={formData.message}
          onChange={handleChange}
          placeholder="I'm interested in..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none
            ${showErrors && errors.message 
              ? "border-red-500" 
              : "border-gray-300 focus:border-red-500"}`}
        />
        {showErrors && errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Submit
        </button>
      </div>

      {/* Required fields hint */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        <span className="text-red-500">*</span> Required fields
      </p>
    </form>
  );
};

export default Index;