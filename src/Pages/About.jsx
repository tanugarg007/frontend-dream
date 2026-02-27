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
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{ 
          backgroundImage: `url(${logo9})`,
          // backgroundColor: '#1a1a1a' // Fallback color while image loads
        }}
      >
       
             
   <div
  className="relative w-full min-h-[440px] lg:h-[530px]
  bg-no-repeat bg-cover bg-[center_top]
  lg:bg-[length:100%_auto]
  mt-[70px] lg:mt-20 py-4 lg:py-0 flex items-center justify-center"
  style={{ backgroundImage: `url(${logo11})` }}
>
  {/* overlay optional */}
  <div className="absolute inset-0"></div>

  {/* ✅ SAME STUDIO DIVISION BOX */}
 <div className="w-full flex justify-center relative z-40 mt-0">
  <div
    className="
      relative
      w-[92%] lg:w-[85%] max-w-[1100px]
      bg-white/5 backdrop-blur-sm
      rounded-2xl lg:rounded-3xl shadow-2xl
      border-l-4 lg:border-l-8 border-red-800
      px-5 lg:px-14 py-6 lg:py-10
      min-h-0 lg:min-h-[300px]
      overflow-hidden
    "
  >
    <img
      src={logo16}
      alt=""
      className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-10"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"></div>
    <div className="relative z-10 h-full w-full flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-8">
      <div className="w-full lg:w-[70%] text-center lg:text-left">
        <p className="inline-block px-4 lg:px-14 py-1 rounded-full bg-[#1a525e]/10 text-[#1a525e] text-[10px] lg:text-[28px] font-semibold tracking-wider ml-0 lg:ml-10">
          ABOUT DREAM ANIMEX
        </p>
        <h2 className="text-[#133f48] text-[34px] lg:text-[60px] font-extrabold mt-1 lg:-mt-1 leading-[1.06] ml-0 lg:ml-10">Dream Animex</h2>
        <p className="text-[#24707f] text-[17px] lg:text-[36px] font-semibold mt-0 lg:-mt-1 ml-0 lg:ml-10">Where Skill Meet Creativity</p>
        
      </div>
      <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
        <div className="rounded-2xl p-1 lg:p-4">
          <img
            src={logo}
            alt="Dream Animex Logo"
            className="w-[126px] h-[154px] lg:w-[260px] lg:h-[320px] object-contain opacity-60"
          />
        </div>
      </div>
    </div>

  </div>
  </div>

     
    </div>
  


        {/* About Section */}
        <div className="w-full min-h-[450px] flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex justify-center items-center py-6 order-1 lg:order-2">
            <img
              src={logo14}
              alt="Dream Animex Institute"
              className="w-[300px] h-[300px] lg:w-[410px] lg:h-[400px] rounded-xl shadow-md shadow-white hover:shadow-xl transition-shadow duration-300"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1 -mt-3 lg:mt-0">
          <p
  className="text-white text-base lg:text-lg pt-2 lg:pt-4 px-8 lg:px-8 leading-relaxed 
             ml-0 lg:ml-28 text-center lg:text-left lg:mr-20"
  
>
  Dream Animex is a creative animation institute and studio focused on building industry-ready skills through practical, mentor-led training. Our programs are carefully designed for beginners and aspiring professionals who want hands-on experience, strong portfolios, and real-world guidance in creative and digital domains.
</p>

<p
  className="text-white text-base lg:text-lg pt-2 lg:pt-5 px-10 lg:px-8 leading-relaxed 
             ml-0 lg:ml-28 text-center lg:text-left"
  
>
  At Dream Animex, students learn through project-based training, real studio workflows, and expert mentorship, ensuring they gain both technical expertise and creative confidence.
</p>

<p
  className="text-white text-base lg:text-lg pt-2 lg:pt-5 px-10 lg:px-8 leading-relaxed 
             ml-0 lg:ml-28 text-center lg:text-left"
  
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




   



