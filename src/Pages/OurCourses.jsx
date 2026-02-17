import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from '../Images/dream-anim-logo.png'
import logo9 from '../Images/page-background.JPG'
import logo8 from '../Images/graphic des.jpg'
import logo7 from '../Images/video edt.jpg'
import logo6 from '../Images/uianduxdesign.jpg'
import logo10 from '../Images/digitalmark.jpg'
import logo11 from '../Images/uiandgraphic.jpg'
const OurCourses =()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [showPopup, setShowPopup] = useState(false);
      const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
    setIsMenuOpen(false);
  };
    return(
      <div>
        <div className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:min-h-screen  "
          style={{ backgroundImage: `url(${logo9})`  }} >
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
      <ul className='text-lg text-cyan-900 flex justify-evenly items-center mt-5 font-bold ' style={{ fontFamily: "Playwrite NZ Basic, cursive" }} >
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
        <li>
          <Link to='/student-corner' className="hover:text-red-600 transition-colors">
            Student Corner
          </Link>
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
                className='bg-red-600 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'
              >
                Enquiry
              </button>
    </div>
    
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

       <div className="w-full h-[70px]  mt-20"></div>

      <div className="w-full h-[60px] md:h-[90px] border border-white mt-5 flex justify-center items-center bg-white">
         <h2 className=" text-3xl md:text-5xl text-cyan-900 font-bold text-center " style={{ fontFamily: 'Dancing Script, cursive' }}>
           Our Courses
            </h2>
</div>

          <div className="w-full md:h-[900px] mt-5">
  
  {/* ROW 1 */}
  <div className="w-full md:h-1/2 flex flex-col md:flex-row gap-8 py-3 px-4 md:px-8">
    
    {/* CARD 1 */}
    <div className="group w-full md:w-1/3 md:h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50">
      <div className="w-full h-[75%] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 z-10"></div>
        <img src={logo8} alt='' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="w-full h-[15%] px-6 flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <h2 className="text-3xl lg:text-3xl text-white font-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
          Graphic Design Course (4 Months)
        </h2>
      </div>

      <div className="w-full h-[10%] px-6 flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/30">
        <button className="group/btn flex items-center text-white hover:text-purple-400">
          <span className="text-xl" style={{ fontFamily: "Dancing Script, cursive" }}>View Course</span>
          <Link to="/graphic-design">
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </Link>
        </button>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="group w-full md:w-1/3 md:h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50">
      <div className="w-full h-[75%] overflow-hidden relative">
        <img src={logo7} alt='' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="w-full h-[15%] px-6 flex items-center">
        <h2 className="text-3xl lg:text-3xl text-white font-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
          Video Editing Course (4 Months)
        </h2>
      </div>

      <div className="w-full h-[10%] px-6 flex items-center border-t border-gray-700/30">
        <button className="group/btn flex items-center text-white hover:text-purple-400">
          <span className="text-xl" style={{ fontFamily: "Dancing Script, cursive" }}>View Course</span>
          <Link to="/video-editing">
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </Link>
        </button>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="group w-full md:w-1/3 md:h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50">
      <div className="w-full h-[75%] overflow-hidden relative">
        <img src={logo6} alt='' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="w-full h-[15%] px-6 flex items-center">
        <h2 className="text-3xl lg:text-3xl text-white font-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
          UI & UX Design Course (4 Months)
        </h2>
      </div>

      <div className="w-full h-[10%] px-6 flex items-center border-t border-gray-700/30">
        <button className="group/btn flex items-center text-white hover:text-purple-400">
          <span className="text-xl" style={{ fontFamily: "Dancing Script, cursive" }}>View Course</span>
          <Link to="/ui&ux-design">
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </Link>
        </button>
      </div>
    </div>
  </div>

  {/* ROW 2 */}
  <div className="w-full md:h-1/2 flex flex-col md:flex-row gap-8 py-3 px-4 md:px-8">
     <div className="group w-full md:w-1/3 md:h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50">
      <div className="w-full h-[75%] overflow-hidden relative">
        <img src={logo10} alt='' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="w-full h-[15%] px-6 flex items-center">
        <h2 className="text-3xl  text-white font-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
          Digital Marketing (6 Months)
        </h2>
      </div>

      <div className="w-full h-[10%] px-6 flex items-center border-t border-gray-700/30">
        <button className="group/btn flex items-center text-white hover:text-purple-400">
          <span className="text-xl" style={{ fontFamily: "Dancing Script, cursive" }}>View Course</span>
          <Link to="/digital-marketing">
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </Link>
        </button>
      </div>
    </div>
     <div className="group w-full md:w-1/3 md:h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50">
      <div className="w-full h-[75%] overflow-hidden relative">
        <img src={logo11} alt='' className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>

      <div className="w-full h-[15%] px-6 flex items-center">
        <h2 className="text-2xl  text-white font-bold" style={{ fontFamily: "Dancing Script, cursive" }}>
          Graphic Design and UI & UX Design Course (6 Months)
        </h2>
      </div>

      <div className="w-full h-[10%] px-6 flex items-center border-t border-gray-700/30">
        <button className="group/btn flex items-center text-white hover:text-purple-400">
          <span className="text-xl" style={{ fontFamily: "Dancing Script, cursive" }}>View Course</span>
          <Link to="/graphic&uiux">
            <i className="fa-solid fa-arrow-right ml-3"></i>
          </Link>
        </button>
      </div>
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
                  <Link
                    to="info.dreamanimex@gmail.com"
                    className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center hover:bg-sky-800 transition-all duration-300 transform hover:scale-110"
                  >
                    <i className="fa-regular fa-envelope text-white text-xl"></i>
                  </Link>
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
                <p className="text-white ml-5 break-all mt-2">
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
    href="https://www.instagram.com/company/dreamanimex/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline "
  >
    instagram.com/dreamanimex
  </a>
</p>
              </div>
              <div className="flex items-start mb-3">
                <i className="fa-brands fa-linkedin-in text-2xl text-white mt-1"></i>
               <p className="text-white ml-5 break-all mt-2">
  <a
    href="https://www.linkedin.com/company/dreamanimex/"
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
            <p className="text-white text-center text-base mt-3 py-4 " style={{ fontFamily: "Playwrite NZ Basic, cursive" }}>
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
            course: '',
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
    
    )
}
export default OurCourses