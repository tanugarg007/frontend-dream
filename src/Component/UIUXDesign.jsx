import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../Images/dream-logo-ok.png';
import logo9 from '../Images/page-background.JPG';
import logo5 from '../Images/uiandux.png'
import logo4 from '../Images/yellowback2.jpg';
import whatsappImg from '../Assets/whatsapp.png';
import Navbar from '../Component/Navbar';
import EnquiryModal from '../Component/EnquiryModal';
import Footer from '../Component/Footer';

const UIUXDesign = () => { const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="w-full">
      {/* Background */}
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:min-h-screen"
        style={{ backgroundImage: `url(${logo9})` }}
      >
                <Navbar onEnquiryClick={() => setShowPopup(true)} />

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
        <h2 className="text-3xl md:text-3xl  text-gray-800 tracking-tight">
            UI & UX Design 
        </h2>
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-0 pl-0 md:pl-8 pt-3 md:pt-5 pr-0 md:pr-6">
        <p className="text-sm md:text-lg text-gray-600 leading-relaxed px-5 md:px-0">
          This program introduces user interface and user experience design principles, wireframing, prototyping, and usability basics. Students learn to design clean, functional, and user-friendly digital experiences. The course focuses on understanding user behavior, creating intuitive layouts, and solving real-world design problems through thoughtful design decisions.
        </p>
         <p className="text-sm md:text-lg font-semibold text-gray-700 mt-1 px-5 md:px-0">
          Duration: 4 Months
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-wrap gap-3 pl-4 md:pl-8 mt-4 md:mt-auto pb-4">
      <button 
                onClick={() => setShowPopup(true)}
                className='bg-red-800 text-white text-lg px-5 py-2 rounded hover:bg-red-500 transition-all duration-300 transform hover:scale-105'
              >
               Get Enquiry
              </button>


        <a
          href="https://wa.me/919888695595"
          target="_blank"
          rel="noopener noreferrer"
          className="border-2 border-green-500 text-green-500 text-sm md:text-lg rounded-lg px-4 py-2 md:px-5 md:py-3 font-medium hover:bg-green-50 transition-all flex items-center gap-2"
        >
          <img src={whatsappImg} alt="WhatsApp" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
          WhatsApp
        </a>
      </div>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-[40%] h-auto md:h-full flex justify-center items-center mt-6 md:mt-0 pb-4 md:pb-0">
      <div className="w-[260px] md:w-[380px] h-[220px] md:h-[320px] rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
        <img src={logo5} alt="" className="w-full h-full object-cover scale-[1.25]" />
      </div>
    </div>

  </div>
</div>


        {/* Why Choose Section */}
       <div className="w-[90%] md:w-[75%] h-auto bg-gradient-to-br from-white to-gray-50 mt-8 md:mt-10 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col md:ml-48 ml-5">

  {/* Header */}
  <div className="w-full border-b border-gray-100 flex items-center px-4 md:px-5 py-3">
    <h2 className="text-xl md:text-3xl font-bold  tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
      Why Choose Our UI/UX Design Course?
    </h2>
  </div>

  {/* Content */}
  <div className="w-full px-4 py-4 space-y-4">

    {/* Why Choose Points */}
    {[
      ["purple", "Master the fundamentals of UI and UX design, from user research and information architecture to polished visual interfaces."],
      ["indigo", " Build a strong UI/UX portfolio with real-world projects, practical workflows, and industry-relevant design tools."],
      ["blue", "Understand user behavior, usability principles, and design thinking to build meaningful and accessible digital products."],
      ["cyan", "Design intuitive and user-centered digital experiences that are simple, seamless, and impactful."],
      ["teal", "Design responsive, visually engaging interfaces for web and mobile platforms that enhance user interaction."]
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
 {/* Modules Covered */}
    <div>
      <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        Software Covered
      </h3>

      <div className="flex flex-wrap gap-3">
         {["Figma", "FigJam", "Adobe Illustrator(Basic)", "Adobe Photoshop(Basic)", "Google Forms", "Notion"].map((tool, i) => (
          <span
            key={i}
            className="px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-md bg-red-800 hover:-translate-y-0.5 transition"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
    

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
  </div>
</div>


        <Footer/>

           
                               <EnquiryModal isOpen={showPopup} onClose={() => setShowPopup(false)} />
      </div>
    </div>
  );
};

export default UIUXDesign;





