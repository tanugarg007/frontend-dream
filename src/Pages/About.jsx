import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FAQ from '../Component/FAQ';
import Footer from '../Component/Footer';

import logo14 from '../Images/aboutus.png';
import logo9 from '../Assets/page-background.JPG';
import logo11 from '../Images/aboutbackground.png';
import logo16 from '../Images/imagestexture.jpg';
import logo from '../Images/dream-anim-logo.png';
import Navbar from '../Component/Navbar';

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [hoverIndex,setHoverIndex]= useState(null);
  const location = useLocation();
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

  useEffect(() => {
    if (location.state?.openCoursesMenu) {
      setIsMenuOpen(true);
      setOpenCourses(true);
    }
  }, [location.state]);
  

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
       
             
   <div
  className="relative w-full h-[340px] md:h-[530px]
  bg-no-repeat bg-center
  bg-[length:80%_auto] md:bg-[length:100%_auto]
  mt-20 flex items-center justify-center"
  style={{ backgroundImage: `url(${logo11})` }}
>
  {/* overlay optional */}
  <div className="absolute inset-0"></div>

  {/* ✅ SAME STUDIO DIVISION BOX */}
 <div className="w-full flex justify-center relative z-40">
  <div
    className="
      relative
      w-[95%] md:w-[85%]
      bg-white/90 backdrop-blur-xl
      rounded-3xl shadow-2xl
      border-l-8 border-red-800
      px-6 md:px-14 py-8 md:py-10
      min-h-[260px] md:min-h-[300px]
      overflow-hidden
    "
  >
    <img
      src={logo16}
      alt=""
      className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-30"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/45 to-white/20 rounded-3xl"></div>
    <div className="relative z-10 h-full w-full flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="w-full md:w-[70%] text-center md:text-left">
        <p className="inline-block px-3 py-1 rounded-full bg-[#1a525e]/10 text-[#1a525e] text-xs md:text-sm font-semibold tracking-wide ml-10">
          ABOUT DREAM ANIMEX
        </p>
        <h2 className="text-[#133f48] text-3xl md:text-5xl font-extrabold mt-3 leading-tight">Dream Animex</h2>
        <p className="text-[#24707f] text-lg md:text-xl font-semibold mt-2 ml-10">Where Skill Meet Creativity</p>
        
      </div>
      <div className="w-full md:w-[30%] flex justify-center md:justify-end">
        <div className="rounded-2xl  p-3 md:p-4  ">
          <img
            src={logo}
            alt="Dream Animex Logo"
            className="w-[90px] h-[110px] md:w-[130px] md:h-[160px] object-contain opacity-50"
          />
        </div>
      </div>
    </div>

  </div>
  </div>

     
    </div>
  


        {/* About Section */}
        <div className="w-full min-h-[450px] flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center items-center py-6 order-1 md:order-2">
            <img
              src={logo14}
              alt="Dream Animex Institute"
              className="w-[260px] h-[260px] md:w-[410px] md:h-[400px] rounded-xl shadow-md shadow-white hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          <p
  className="text-white text-base md:text-lg pt-4 px-8 md:px-8 leading-relaxed 
             ml-0 md:ml-28 text-center md:text-left md:mr-20"
  
>
  Dream Animex is a creative animation institute and studio focused on building industry-ready skills through practical, mentor-led training. Our programs are carefully designed for beginners and aspiring professionals who want hands-on experience, strong portfolios, and real-world guidance in creative and digital domains.
</p>

<p
  className="text-white text-base md:text-lg pt-5 px-10 md:px-8 leading-relaxed 
             ml-0 md:ml-28 text-center md:text-left"
  
>
  At Dream Animex, students learn through project-based training, real studio workflows, and expert mentorship, ensuring they gain both technical expertise and creative confidence.
</p>

<p
  className="text-white text-base md:text-lg pt-5 px-10 md:px-8 leading-relaxed 
             ml-0 md:ml-28 text-center md:text-left"
  
>
  With a beginner-friendly approach and personalized guidance, Dream Animex prepares students to meet current industry standards, making them job-ready and future-focused in the animation and digital creative industry.
</p>

          </div>
        </div>

       <FAQ/>

        {/* Footer */}
          <Footer />

      
      </div>
    </div>
  
  );
};

export default About;




   


