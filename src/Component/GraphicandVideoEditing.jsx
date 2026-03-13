import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Component/Navbar';
import EnquiryModal from '../Component/EnquiryModal';
import Footer from './Footer';
const logo = '/Images/dream-logo-ok.png';
const logo9 = '/Images/page-background.JPG';
const logo5 = '/Images/gv.png';
const logo4 = '/Images/yellowback2.jpg';
const whatsappImg = '/Assets/whatsapp.png';

const GraphicandVideoEditing = () => { const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="w-full">
      {/* Background */}
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat lg:min-h-screen"
        style={{ backgroundImage: `url(${logo9})` }}
      >
                <Navbar onEnquiryClick={() => setShowPopup(true)} />

        {/* Hero Section */}
     <div
  className="w-full h-auto lg:h-[530px] flex flex-col lg:flex-row justify-center items-center
             mt-20 lg:mt-0
             rounded-br-[20px] lg:rounded-br-[200px]"
  style={{
    backgroundImage: `url(${logo4})`,
  }}
>
  
  <div className="
  w-[90%] lg:w-[75%] 
  h-auto lg:h-[70%] 
  bg-white 
  flex flex-col lg:flex-row 
  rounded-xl shadow-2xl 
  py-2 lg:py-0
  mt-4 lg:mt-20 mb-3
">

    {/* Left */}
    <div className="w-full lg:w-[60%] h-auto lg:h-full flex flex-col order-2 lg:order-1">

      {/* Title */}
      <div className="w-full pl-2 lg:pl-8 pt-4 lg:pt-6">
        <h2 className="text-2xl lg:text-3xl  text-gray-800 tracking-tight">
          Graphic Design + Video Editing Course
        </h2>
      </div>

      {/* Content */}
      <div className="w-full px-4 lg:px-0 pl-0 lg:pl-8 pt-3 lg:pt-5 pr-0 lg:pr-6">
        <p className="text-sm lg:text-lg text-gray-600 leading-normal px-5 lg:px-0 ">
         An integrated program combining design and video production skills. Ideal for students who want to become versatile creative professionals with expertise across multiple visual media formats. The course focuses on building creative thinking, technical proficiency, and a strong visual storytelling approach. Students gain hands-on experience working on real-world projects that blend graphic design, motion, and video production.
        </p>
         <p className="text-sm lg:text-lg font-semibold text-gray-700 mt-1 px-5 lg:px-0">
          Duration: 6 Months
        </p>
      </div>

      {/* Buttons */}
      <div className="w-full flex flex-wrap gap-3 pl-4 lg:pl-8 mt-4 lg:mt-auto pb-4">
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
          className="border-2 border-green-500 text-green-500 text-sm lg:text-lg rounded-lg px-4 py-2 lg:px-5 lg:py-3 font-medium hover:bg-green-50 transition-all flex items-center gap-2"
        >
          <img src={whatsappImg} alt="WhatsApp" className="w-5 h-5 lg:w-6 lg:h-6 object-contain" />
          WhatsApp
        </a>
      </div>
    </div>

    {/* Right Image */}
    <div className="w-full lg:w-[40%] h-auto lg:h-full flex justify-center items-center mt-4 lg:mt-0 pb-2 lg:pb-0 order-1 lg:order-2">
      <div className="relative w-[290px] lg:w-[350px] h-[290px] lg:h-[320px] rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-500">
        <img src={logo5} alt="" className="w-full h-full object-cover object-top scale-[1.16] lg:scale-[1.40]" />
        <div className="lg:hidden absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#2f1b36] via-[#2f1b36]/95 to-transparent" />
      </div>
    </div>

  </div>
</div>


        {/* Why Choose Section */}
       <div className="w-[90%] lg:w-[75%] h-auto bg-gradient-to-br from-white to-gray-50 mt-8 lg:mt-10 rounded-xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col lg:ml-48 ml-5">

  {/* Header */}
  <div className="w-full border-b border-gray-100 flex items-center px-4 lg:px-5 py-3">
    <h2 className="text-xl lg:text-3xl font-bold  tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
      Why Choose Our Graphic Design + Video Editing Course?
    </h2>
  </div>

  {/* Content */}
  <div className="w-full px-4 py-4 space-y-4">

    {/* Why Choose Points */}
    {[
      ["purple","We design creative visuals and edit cinematic videos that bring your ideas to life."],
      ["indigo", "From concept to final cut, we craft visuals that speak, move, and inspire."],
      ["blue", "Our approach blends creativity with strategy to deliver impactful visual experiences."],
      ["cyan", "Professional graphic design and video editing services tailored to build strong brands."],
      ["teal", "Your vision, our creativity — designing ideas and editing stories that truly matter."]
    ].map(([color, text], index) => (
      <p
        key={index}
        className={`text-gray-700 text-sm lg:text-lg px-3 py-2 leading-relaxed border-l-4 border-${color}-500 bg-gradient-to-r from-${color}-50 to-transparent`}
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
        {["Adobe Photoshop ", "  Adobe Illustrator", " Adobe Premiere Pro", "Adobe InDesign", " Adobe After Effects","DaVinci Resolve."].map((tool, i) => (
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
      <p className="text-gray-700 text-sm lg:text-lg leading-relaxed">
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

export default GraphicandVideoEditing;










