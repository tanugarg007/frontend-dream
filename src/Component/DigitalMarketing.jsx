import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../Images/dream-anim-logo.png';
import logo9 from '../Images/page-background.JPG';
import logo5 from '../Images/digitalmark2.jpg';
import logo4 from '../Images/yellowback2.jpg';

const DigitalMarketing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full">
      {/* Background */}
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:min-h-screen"
        style={{ backgroundImage: `url(${logo9})` }}
      >
        {/* Header */}
        <header className="fixed top-0 left-0 w-full z-50">
          {/* Logo */}
          <div className="fixed top-0 left-0 w-[80px] h-auto md:w-[100px] z-[9999] pointer-events-none flex items-center justify-center">
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
            <div className="w-[30%] md:w-[25%] h-full"></div>
            <div className="hidden md:block w-[55%] h-full">
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
            <div className="hidden md:flex w-[15%] h-full justify-center items-center">
              <button 
                onClick={() => setShowPopup(true)}
                className='bg-red-600 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'
              >
                Enquiry
              </button>
            </div>
            <div className="md:hidden w-[70%] h-full flex justify-end items-center pr-4">
              <i className="fa-solid fa-bars text-cyan-900 text-2xl font-bold cursor-pointer" onClick={toggleMenu}></i>
            </div>
            <div className="hidden md:block w-[5%] h-full"></div>
          </nav>

          {/* Mobile Menu */}
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
        </header>

        {/* Hero Section */}
     <div
  className="w-full h-auto md:h-[500px] flex flex-col md:flex-row justify-center items-center
             mt-20 md:mt-0
             rounded-br-[20px] md:rounded-br-[200px]"
  style={{
    backgroundImage: `url(${logo4})`,
  }}
>

  <div className="
  w-[90%] md:w-[75%] 
  h-auto md:h-[70%] 
  bg-white 
  flex flex-col md:flex-row 
  rounded-xl shadow-2xl 
  py-2 md:py-0
  mt-4 md:mt-20 mb-3
">

    {/* Left */}
    <div className="w-full md:w-[60%] h-auto md:h-full flex flex-col">

      {/* Title */}
      <div className="w-full pl-4 md:pl-8 pt-4 md:pt-6">
        <h2 className="text-3xl md:text-5xl font-[Lobster-Two] text-gray-800 tracking-tight">
          Digital Marketing
        </h2>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-0 pl-0 md:pl-8 pt-3 md:pt-5 pr-0 md:pr-6">
        <p className="text-sm md:text-lg text-gray-600 leading-relaxed px-5 md:px-0">
          A comprehensive course covering online marketing strategies, campaign planning, audience targeting,
          and performance analysis. Students gain practical exposure to marketing tools and real-world scenarios.
          The program focuses on building data-driven marketing skills, understanding consumer behavior, and
          creating result-oriented digital campaigns.
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-wrap gap-3 pl-4 md:pl-8 mt-4 md:mt-auto pb-4">
        <button 
                onClick={() => setShowPopup(true)}
                className='bg-red-600 text-white text-lg px-5 py-2 rounded hover:bg-red-700 transition-all duration-300 transform hover:scale-105'
              >
               Get Enquiry
              </button>

        <Link to="https://wa.me/919888695595">
          <button className="border-2 border-green-500 text-green-500 text-sm md:text-lg rounded-lg px-4 py-2 md:px-5 md:py-3 font-medium hover:bg-green-50 transition-all flex items-center gap-2">
            <i className="fa-brands fa-whatsapp text-green-500 text-lg md:text-xl"></i>
            WhatsApp
          </button>
        </Link>
      </div>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-[40%] h-auto md:h-full flex justify-center items-center mt-6 md:mt-0 pb-4 md:pb-0">
      <div className="w-[260px] md:w-[380px] h-[220px] md:h-[320px] rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
        <img src={logo5} alt="" className="w-full h-full object-cover" />
      </div>
    </div>

  </div>
</div>


        {/* Why Choose Section */}
       <div className="w-[90%] md:w-[75%] h-auto bg-gradient-to-br from-white to-gray-50 mt-8 md:mt-10 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col md:ml-48 ml-5">

  {/* Header */}
  <div className="w-full border-b border-gray-100 flex items-center px-4 md:px-5 py-3">
    <h2 className="text-xl md:text-3xl font-bold font-[Lobster-Two] tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
      Why Choose Our Digital Marketing Course?
    </h2>
  </div>

  {/* Content */}
  <div className="w-full px-4 py-4 space-y-4">

    {/* Why Choose Points */}
    {[
      ["purple","Learn powerful digital marketing strategies to promote brands, products, and services online."],
      ["indigo", "Understand audience targeting, campaign planning, and content marketing for better reach and engagement."],
      ["blue", "Gain hands-on experience with social media marketing, SEO, paid ads, and analytics tools."],
      ["cyan", "Analyze campaign performance and optimize strategies using data-driven insights."],
      ["teal", "Build practical skills to manage real-world digital marketing campaigns across multiple platforms."]
    ].map(([color, text], index) => (
      <p
        key={index}
        className={`text-gray-700 text-sm md:text-lg px-3 py-2 leading-relaxed border-l-4 border-${color}-500 bg-gradient-to-r from-${color}-50 to-transparent`}
      >
        <span className={`font-semibold text-${color}-600`}>✦</span> {text}
      </p>
    ))}

    {/* Divider */}
    <div className="w-full h-[1px] bg-gray-200 my-4"></div>

    {/* Certification */}
    <div>
      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
        Certification
      </h3>
      <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
        Students receive a{" "}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
          course completion certificate
        </span>{" "}
        from{" "}
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-700">
          Dream Animex
        </span>{" "}
        after successfully completing the selected program.
      </p>
    </div>

    {/* Divider */}
    <div className="w-full h-[1px] bg-gray-200 my-4"></div>

    {/* Modules Covered */}
    <div>
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Modules Covered
      </h3>

      <div className="flex flex-wrap gap-3">
        {[
          "SEO",
          "SEM",
          "Social Media Marketing (SMM)",
          "Content Marketing",
          "Email Marketing & Automation",
          "Reporting & Analytics"
        ].map((tool, i) => (
          <span
            key={i}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:-translate-y-0.5 transition"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>

  </div>
</div>


        {/* Footer */}
        <div className="w-full min-h-[360px] px-4 md:px-0 mt-10 ">
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start md:h-[250px] md:px-20">
            {/* Logo + Social */}
            <div className="w-full md:w-[280px] mb-4 md:mb-0 mt-4">
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
              <div className="flex mt-6 gap-3 justify-start md:justify-center">
                <Link to="https://www.linkedin.com/company/dreamanimex">
                  <div className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center">
                    <i className="fa-brands fa-linkedin-in text-white text-xl"></i>
                  </div>
                </Link>
                <Link to="https://www.instagram.com/dreamanimex/">
                  <div className="w-[50px] h-[50px] rounded-full bg-sky-700 flex justify-center items-center">
                    <i className="fa-brands fa-instagram text-white text-xl"></i>
                  </div>
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

            {/* Quick Links */}
            <div className="w-full md:w-[260px] pl-4 mt-4">
              <h3 className="text-white text-2xl md:text-3xl">Quick Links</h3>
              <ul className="text-white text-lg mt-3 leading-7">
                <li>Home</li>
                <li>About Us</li>
                <li>Our Courses</li>
                <li>Contact Us</li>
                <li>Studio Divison</li>
                <li>Student Corner</li>
              </ul>
            </div>

            {/* Courses */}
            <div className="w-full md:w-[260px] pl-4 mt-4">
              <h3 className="text-white text-2xl md:text-3xl">Our Courses</h3>
              <ul className="text-white text-lg mt-3 leading-7">
                <li>Graphic Design</li>
                <li>Video Editing</li>
                <li>UI/UX Design</li>
                <li>Digital Marketing</li>
              </ul>
            </div>

            {/* Contact */}
            <div className="w-full md:w-[405px] mt-4 p-2">
              <h3 className="text-white text-2xl md:text-3xl mt-0">Contact Us</h3>
              <div className='flex flex-row mt-2 items-center'><i className="fa-solid fa-envelope text-2xl text-white"></i> <p className="text-white ml-5 break-all">
  <a
    href="https://mail.google.com/mail/?view=cm&fs=1&to=info.dreamanimex@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline"
  >
    info.dreamanimex@gmail.com
  </a>
</p></div>
              <div className='flex flex-row mt-2 items-center'><i className="fa-brands fa-instagram text-2xl text-white"></i> <p className="text-white ml-5 break-all mt-2">
  <a
    href="https://www.instagram.com/dreamanimex/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline"
  >
   instagram.com/dreamanimex
  </a>
</p></div>
              <div className='flex flex-row mt-2 items-center'><i className="fa-brands fa-linkedin-in text-2xl text-white"></i>            <p className="text-white ml-5 break-all mt-2">
  <a
    href=" https://www.linkedin.com/company/dreamanimex/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-400 transition-colors underline "
  >
    linkedin.com/company/dreamanimex
  </a>
</p></div>
              <div className='flex flex-row mt-2 items-center'><i className="fa-solid fa-phone text-2xl text-white"></i><p className='text-white ml-4'>9888695595</p></div>
            </div>
          </div>

          <div className="w-full mt-10">
            <hr className="border-slate-700 w-full md:w-[88%] md:ml-24" />
            <p className="text-white text-center text-base mt-3">© Dream Animax Academy 2026 All rights reserved.</p>
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
     
  );
};

export default DigitalMarketing;
