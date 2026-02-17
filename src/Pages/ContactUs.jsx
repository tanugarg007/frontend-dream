import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo9 from "../Images/page-background.JPG";
import logo1 from "../Images/dream-anim-logo.png";
import logo18 from "../Assets/orangeback.jpg";

const ContactUs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    mail: "",
    contactNumber: "",
    address: "",
    course: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.mail) newErrors.mail = "Email is required";
    if (!formData.contactNumber)
      newErrors.contactNumber = "Contact number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.course) newErrors.course = "Please select a course";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    alert("Form Submitted Successfully ✅");

    setFormData({
      fullName: "",
      mail: "",
      contactNumber: "",
      address: "",
      course: "",
    });
    setErrors({});
  };
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full">
      {/* ================= HERO BACKGROUND ================= */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${logo9})` }}
      >
        {/* ================= HEADER ================= */}
     <header className="fixed top-0 left-0 w-full z-50">
       {/* Logo - Visible on both mobile and desktop */}
       <div className="fixed top-0 left-0 w-[100px] h-auto z-[9999] pointer-events-none flex items-center justify-center">
        
         <img
           src={logo1}
           alt="logo"
           className="w-[70px] h-[90px] md:w-[90px] md:h-[110px]"
           style={{
             filter:
               "drop-shadow(0 0 40px white) drop-shadow(0 0 40px white) drop-shadow(0 0 70px rgba(255,255,255,0.9))",
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
             <li
              className="hover:text-red-600 transition-colors">
                 Student Corner
              
             </li>
             <li>
               <Link to='/studio-division' className="hover:text-red-600 transition-colors">
                 Studio Division
               </Link>
             </li>
                <li>
                  <Link to='/contact-us' className="hover:text-red-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
           </ul>
         </div> 
         
         {/* Enquire Button - Hidden on mobile, visible on desktop */}
         <div className='hidden md:flex w-[15%] h-full justify-center items-center'>
                    <button 
                onClick={() => setShowPopup(true)}
                className='bg-red-600 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'
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
                                    <Link to="/ui&ux-design" onClick={closeMenu}>UI / UX Design</Link>
                                  </li>
                                  <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                                    <Link to="/video-editing" onClick={closeMenu}>Video Editing</Link>
                                  </li>
                                  <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                                    <Link to="/digital-marketing" onClick={closeMenu}>Digital Marketing</Link>
                                  </li>
                                  <li className="px-10 py-3 text-gray-700 hover:bg-gray-600 hover:text-white transition-colors">
                                    <Link to="/graphic&uiux" onClick={closeMenu}>Graphic Design & UI/UX Design</Link>
                                  </li>
                                </ul>
                              )}
                            </li>
     
           <li className="border-b border-gray-100 text-cyan-900 font-bold text-lg  hover:text-red-500 px-6 py-3">
                             Student Corner
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

        {/* ================= HERO SECTION ================= */}
      <div className="relative pt-[70px]">

  {/* ===== ORANGE BACKGROUND ===== */}
  <div
    className="w-full h-[320px] md:h-[450px]
               rounded-br-[60px] md:rounded-br-[180px]"
    style={{ backgroundImage: `url(${logo18})` }}
  >
     <div className="h-full flex flex-col justify-center items-center text-center">

      {/* Heading */}
      <h2 className="text-white text-4xl md:text-5xl font-semibold
                     mt-6 md:mb-3 " style={{ fontFamily: "Playwrite NZ Basic, cursive" }}
             >
        CONTACT US
      </h2>

      {/* Paragraph */}
      <p
        className="text-white text-base md:text-xl
                   mb-20 md:mb-36
                   px-6 md:px-[420px]"
      >
        Reach out to us through the contact form below or simply give us a call.
        We’d love to connect and guide you toward a successful creative career.
      </p>

    </div>
  </div>
  {/* ================= FORM ================= */}
  <form
    onSubmit={handleSubmit}
    className="w-[92%] md:w-[50%]
               mx-auto
               mt-[-150px] md:mt-[-200px]
               bg-white rounded-lg shadow-lg 
               p-6 md:p-8"
  >

    {/* Row 1 */}
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full">
  <label className="font-semibold">Full Name</label>

  <input
    name="fullName"
    value={formData.fullName}
    placeholder="Full Name"
    onChange={handleChange}
    className={`w-full border px-4 py-2 rounded-lg mt-1
      focus:outline-none
      ${errors.fullName
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
  />

  {errors.fullName && (
    <p className="text-red-500 text-sm">{errors.fullName}</p>
  )}
</div>


      <div className="w-full">
        <label className="font-semibold">Email</label>
        <input
          name="mail"
          value={formData.mail}
          placeholder="Email"
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-lg mt-1
             ${errors.mail
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
        />
         {errors.mail && (
          <p className="text-red-500 text-sm">{errors.mail}</p>
        )}
      </div>
    </div>

    {/* Row 2 */}
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <div className="w-full">
        <label className="font-semibold">Contact Number</label>
        <input
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact number"
          className={`w-full border px-4 py-2 rounded-lg mt-1
            ${errors.contactNumber
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
        />
        {errors.contactNumber && (
          <p className="text-red-500 text-sm">{errors.contactNumber}</p>
        )}
      </div>

      <div className="w-full">
        <label className="font-semibold">Address</label>
        <input
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
          className={`w-full border px-4 py-2 rounded-lg mt-1
             ${errors.address
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>
    </div>

    {/* Course */}
    <div className="mt-4">
      <label className="font-semibold">Preferred Course</label>
      <select
        name="course"
        value={formData.course}
        onChange={handleChange}
        className={`w-full border px-4 py-2 rounded-lg mt-1
           ${errors.course
        ? "border-red-500"
        : "border-gray-300 border-[2px] hover:border-orange-800 focus:border-orange-800"}`}
      >
        <option value="">Select Option</option>
        <option>Graphic Design</option>
        <option>UI & UX Design</option>
        <option>Digital Marketing</option>
        <option>Video Editing</option>
        <option>Graphic Design and UI/UX Design</option>
      </select>
      {errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
    </div>

    {/* Submit */}
    <button className="w-full mt-6 bg-orange-500 text-white py-3 rounded text-xl hover:bg-blue-800">
      Submit
    </button>
  </form>
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
                             "drop-shadow(0 0 40px white) drop-shadow(0 0 40px white) drop-shadow(0 0 70px rgba(255,255,255,0.9))",
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
                     if (!formData.course.trim()){
                      newErrors.course = 'Course is required';
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

   export default ContactUs