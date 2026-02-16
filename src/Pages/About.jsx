import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo13 from '../Images/faq1.jpg';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import logo1 from '../Images/dream-anim-logo.png';
import logo14 from '../Images/about2.jpg';
import logo9 from '../Assets/page-background.JPG';


const About = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
 
  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenCourses(false);
  };
  

  return (
    <div className="w-full">
      {/* Background Image - Applied Immediately */}
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ 
          backgroundImage: `url(${logo9})`,
          // backgroundColor: '#1a1a1a' // Fallback color while image loads
        }}
      >
        <header className="fixed top-0 left-0 w-full z-50">
          {/* Logo */}
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
          <nav className="fixed top-0 h-[70px] w-full bg-white flex items-center z-[40] shadow-md">
            <div className="w-[30%] md:w-[25%] h-full"></div>

            {/* Desktop Navigation */}
            <div className="hidden md:block w-[55%] h-full">
              <ul className="text-lg text-cyan-900 flex justify-evenly items-center mt-5 font-bold" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
                <li>
                  <Link to='/' className="hover:text-red-600 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to='/about' className="hover:text-red-600 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li className="relative group cursor-pointer">
                  <span className="flex items-center gap-1 hover:text-red-600 transition-colors duration-300">
                    Our Courses
                    <i className="fa-solid fa-caret-down transition-transform duration-300 group-hover:rotate-180"></i>
                  </span>
                   <ul className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 scale-95 group-hover:scale-100 border border-gray-200 z-50">
                    <li className="hover:bg-red-50 transition">
                      <Link to="/graphic-design" className="block px-5 py-3 text-black hover:text-red-600">
                        Graphic Design
                      </Link>
                    </li>
                    <li className="hover:bg-red-50 transition">
                      <Link to="/video-editing" className="block px-5 py-3 text-black hover:text-red-600">
                        Video Editing
                      </Link>
                    </li>
                    <li className="hover:bg-red-50 transition">
                      <Link to="/ui-ux-design" className="block px-5 py-3 text-black hover:text-red-600">
                        UI/UX Design
                      </Link>
                    </li>
                    <li className="hover:bg-red-50 transition">
                      <Link to="/digital-marketing" className="block px-5 py-3 text-black hover:text-red-600">
                        Digital Marketing
                      </Link>
                    </li>
                    <li className="hover:bg-red-50 transition rounded-b-xl">
                      <Link to="/video-graphic-design" className="block px-5 py-3 text-black hover:text-red-600">
                        UI/UX & Graphic Design
                      </Link>
                    </li>
                  </ul> 
                </li>
                <li>
                  <Link to='/student-corner' className="hover:text-red-600 transition-colors duration-300">
                    Student Corner
                  </Link>
                </li>
                <li>
                  <Link to='/studio-division' className="hover:text-red-600 transition-colors duration-300">
                    Studio Division
                  </Link>
                </li>
                <li>
                  <Link to='/contact' className="hover:text-red-600 transition-colors duration-300">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Enquire Button */}
           <div className='hidden md:flex w-[15%] h-full justify-center items-center'>
              <button 
                onClick={() => setShowPopup(true)}
                className='bg-red-600 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'
              >
                Enquiry
              </button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden w-[70%] h-full flex justify-end items-center pr-4">
              <button
                onClick={toggleMenu}
                className="text-cyan-900 text-2xl font-bold cursor-pointer p-2 "
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
            </div>

            <div className="hidden md:block w-[5%] h-full"></div>
          </nav>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div className="md:hidden fixed top-[70px] left-0 w-full bg-white z-[9999] shadow-lg">
                <ul className="flex flex-col py-2">
                  <li className="border-b border-gray-100">
                    <Link
                      to='/'
                      onClick={closeMenu}
                      className="px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 block hover:text-red-500 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="border-b border-gray-100">
                    <Link
                      to='/about'
                      onClick={closeMenu}
                      className="px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 block hover:text-red-500 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li className="border-b border-gray-100">
                    <button
                      onClick={() => setOpenCourses(!openCourses)}
                      className="w-full flex justify-between items-center px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 hover:text-red-500 transition-colors"
                    >
                      Our Courses
                      <i className={`fa-solid fa-caret-down transition-transform duration-300 ${openCourses ? "rotate-180" : ""}`} />
                    </button>
                    {openCourses && (
                      <ul className="bg-gray-50">
                        <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                          <Link to="/graphic-design" onClick={closeMenu}>Graphic Design</Link>
                        </li>
                        <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                          <Link to="/ui-ux-design" onClick={closeMenu}>UI / UX Design</Link>
                        </li>
                        <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                          <Link to="/video-editing" onClick={closeMenu}>Video Editing</Link>
                        </li>
                        <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                          <Link to="/digital-marketing" onClick={closeMenu}>Digital Marketing</Link>
                        </li>
                        <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                          <Link to="/video-graphic-design" onClick={closeMenu}>Graphic Design & Video Editing</Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  <li className="border-b border-gray-100">
                    <Link
                      to='/student-corner'
                      onClick={closeMenu}
                      className="px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 block hover:text-red-500 transition-colors"
                    >
                      Student Corner
                    </Link>
                  </li>
                  <li className="border-b border-gray-100">
                    <Link
                      to='/studio-division'
                      onClick={closeMenu}
                      className="px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 block hover:text-red-500 transition-colors"
                    >
                      Studio Division
                    </Link>
                  </li>
                  <li className="border-b border-gray-100">
                    <Link
                      to='/contact'
                      onClick={closeMenu}
                      className="px-6 py-4 text-cyan-900 font-bold text-lg hover:bg-gray-50 block hover:text-red-500 transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[9998] top-[70px]"
                onClick={closeMenu}
              ></div>
            </>
          )}
       
        </header>

        <div className="w-full h-[70px] mt-20"></div>

        {/* Heading */}
        <div className="w-full h-[140px] bg-white text-cyan-900 text-3xl leading-snug justify-center items-center shadow-sm flex flex-col">
          <h2 style={{ fontFamily: "Playwrite NZ Basic, cursive" }} className="font-bold">
            About The Institute
          </h2>
          <h3 style={{ fontFamily: "Playwrite NZ Basic, cursive" }} className="font-bold">Dream Animex</h3>
          <p  style={{ fontFamily: "Playwrite NZ Basic, cursive" }} className="font-bold">Where Skills Meet Creativity</p>
        </div>

        {/* About Section */}
        <div className="w-full min-h-[450px] flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center items-center py-6 order-1 md:order-2">
            <img
              src={logo14}
              alt="Dream Animex Institute"
              className="w-[260px] h-[260px] md:w-[430px] md:h-[450px] rounded-xl shadow-md shadow-white hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          <p
  className="text-white text-base md:text-xl pt-4 px-8 md:px-8 leading-relaxed 
             ml-0 md:ml-28 text-center md:text-left md:mr-20"
  style={{ fontFamily: 'Playwrite NZ Basic, cursive' }}
>
  Dream Animex is a creative animation institute and studio focused on building industry-ready skills through practical, mentor-led training. Our programs are carefully designed for beginners and aspiring professionals who want hands-on experience, strong portfolios, and real-world guidance in creative and digital domains.
</p>

<p
  className="text-white text-base md:text-xl pt-5 px-10 md:px-8 leading-relaxed 
             ml-0 md:ml-28 text-center md:text-left"
  style={{ fontFamily: 'Playwrite NZ Basic, cursive' }}
>
  At Dream Animex, students learn through project-based training, real studio workflows, and expert mentorship, ensuring they gain both technical expertise and creative confidence.
</p>

<p
  className="text-white text-base md:text-xl pt-5 px-10 md:px-8 leading-relaxed 
             ml-0 md:ml-28 text-center md:text-left"
  style={{ fontFamily: 'Playwrite NZ Basic, cursive' }}
>
  With a beginner-friendly approach and personalized guidance, Dream Animex prepares students to meet current industry standards, making them job-ready and future-focused in the animation and digital creative industry.
</p>

          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full min-h-[550px] flex flex-col md:flex-row mt-5">
          <div className="w-full md:w-[40%] flex justify-center items-center p-4">
            <img
              src={logo13}
              alt="FAQ - Dream Animex"
              className="w-[260px] md:w-[430px] h-auto object-contain rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            />
          </div>

          <div className="w-full md:w-[60%]">
            <div className="w-full">
              <div className="w-full flex items-center gap-3 px-5 mt-2">
                <div className="w-[45px] h-[45px] bg-white rounded-lg flex justify-center items-center shadow-md">
                  <h4 className="text-black text-xl" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
                    FAQ
                  </h4>
                </div>
              </div>
              <h2
                className="text-white text-3xl md:text-4xl ml-5 mt-4 font-bold"
                style={{ fontFamily: "Playwrite NZ Basic, cursive" }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <div className="w-full mt-6">
              {[
                {
                  q: "01. What programs are available at Dream Animex?",
                  a: "We offer professional programs in Animation, VFX, Motion Graphics, Graphic Design, UI/UX, Game Design, and Digital Media, designed for both beginners and advanced learners."
                },
                {
                  q: "02. Are the courses beginner-friendly?",
                  a: "Yes, our courses are designed for beginners as well as aspiring professionals, with step-by-step training and hands-on projects."
                },
                {
                  q: "03. Will I get practical and project-based training?",
                  a: "Absolutely. Students work on real-world projects, studio workflows, and portfolio development throughout the course."
                },
                {
                  q: "04. What software and tools will I learn?",
                  a: "You will train on industry-standard tools like Autodesk Maya, Adobe Creative Suite, Unreal Engine, and other professional software."
                },
                {
                  q: "05. Do you offer flexible or part-time learning options?",
                  a: "Yes, we offer flexible learning modes including full-time, part-time, and blended learning options to suit different needs."
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`relative py-3 cursor-pointer transition-all duration-300 hover:bg-black hover:bg-opacity-20 rounded-lg
                    ${openIndex === index ? "text-blue-400" : "text-white"}`}
                  onClick={() => toggleAnswer(index)}
                >
                  <p className="text-xl ml-5 pr-10 font-medium">
                    {item.q}
                  </p>
                  <span className="absolute right-5 top-4 text-2xl transition-transform duration-300 hover:scale-110">
                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                  {openIndex === index && (
                    <p className="text-lg ml-5 mt-2 leading-relaxed text-white pr-10">
                      {item.a}
                    </p>
                  )}
                  <hr className="border-stone-400 w-[95%] ml-5 mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
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
            <p className="text-white text-center text-lg mt-3 py-4" style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
              © Dream Animex Academy 2026 All rights reserved.
            </p>
          </div>
        </div>

        {/* Enquiry Popup Modal */}
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
  );
};

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
    if(!formData.phone.trim()){
       newErrors.phone = 'Course is required';
    } else if (!/^[^\s@]+$/.test(formData.course)) {
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

export default About;