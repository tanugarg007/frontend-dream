import React from "react";
import { Link } from 'react-router-dom';
import logo7 from '../Images/graphic.png';
import logo11 from '../Images/choose.png';
import logo3 from '../Images/video.png';
import logo4 from '../Images/uiandux.png';
import logo5 from '../Images/digital.png';
import logo6 from '../Images/gv.png';
import logo9 from '../Images/page-background.JPG';


import logo10 from '../Images/slider.jpg.jpeg';
import Navbar from "../Component/Navbar";
import FAQ from "../Component/FAQ";
import Footer from "../Component/Footer";

const Index = () => {
  

  return (
    <div className="w-full ">
      <div className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:min-h-screen" style={{ backgroundImage: `url(${logo9})`, backgroundAttachment: 'fixed' }}>
         
        <div className="w-full  mt-[70px]">
          <img src={logo10} alt="animex" className="w-full" />
        </div>

        <div className='w-full h-24  flex justify-center items-center'>
          <h2 className="text-white text-4xl md:text-5xl font-bold text-center">COURSES</h2>
        </div>

        <div className='w-full h-auto  top-[664px] left-0 '>
          <div className='w-full h-auto  flex flex-col p-3 gap-8 justify-center items-center md:flex-row md:gap-14 md:p-3 '>
            {/* First row */}
            <div className="w-full md:w-[24%] h-auto md:h-[520px] mb-4 md:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] md:min-h-[230px] md:h-[30%] rounded-xl overflow-hidden">
                <img
                  src={logo7}
                  className="w-full h-full object-cover  rounded-xl -mb-px course-image-mobile-crop"
                  alt="Graphic Design "
                  style={{ aspectRatio: '1/1' }}
                />
              </div>
              <div className="w-full h-auto md:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:mt-4 px-3">
                <h3 className="text-white text-lg md:text-2xl font-bold text-center">Graphic Design</h3>
              </div>
              <div className="w-full flex-1 md:h-[20%] mt-1 md:mt-3">
                <p className="text-white text-center px-3 md:px-5 text-base leading-5 md:leading-normal">Graphic design is the visual communication of ideas through typography, imagery, and color, focusing on balancing aesthetics with functionality.</p>
              </div>
              <div className="w-full h-auto md:h-[8%] flex justify-center items-center mt-3 md:mt-3">
                <Link to='/graphic-design'>
                  <button className="text-white bg-red-800 px-10 py-2 text-base md:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[24%] h-auto md:h-[520px] mb-4 md:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] md:min-h-[230px] md:h-[30%] rounded-xl overflow-hidden">
                <img src={logo3} alt="video editing" className="w-full h-full object-cover rounded-xl -mb-px course-mobile-crop" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto md:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:mt-4 px-3">
                <h3 className="text-white text-lg md:text-2xl font-bold text-center">Video Editing</h3>
              </div>
              <div className="w-full flex-1 md:h-[20%] -mt-1 md:mt-3">
                <p className="text-white text-center px-3 md:px-5 text-base leading-5 md:leading-normal">Video editing involves manipulating video and audio to create a compelling narrative, utilizing techniques like B-roll for context, color correction for consistency, and cutting to pacing.</p>
              </div>
              <div className="w-full h-auto md:h-[8%] flex justify-center items-center mt-3 md:mt-3">
                <Link to='/video-editing'>
                  <button className="text-white bg-red-800 px-10 py-2 text-base md:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[24%] h-auto md:h-[520px] mb-4 md:mb-0 border-[4px] border-white  rounded-2xl p-3 flex flex-col">
              <div className="w-full min-h-[240px] md:min-h-[230px] md:h-[30%] rounded-xl overflow-hidden">
                <img src={logo4} alt="ui/ux design" className="w-full h-full object-cover  rounded-xl -mb-px course-mobile-crop" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto md:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:mt-4 px-3">
                <h3 className="text-white text-lg md:text-2xl font-bold text-center">UI & UX Design</h3>
              </div>
              <div className="w-full flex-1 md:h-[20%] -mt-1 md:mt-3">
                <p className="text-white text-center px-3 md:px-5 text-base leading-5 md:leading-normal">UI/UX design focuses on creating intuitive, user-centered digital experiences where functionality meets aesthetics.</p>
              </div>
              <div className="w-full h-auto md:h-[8%] flex justify-center items-center mt-3 md:mt-3">
                <Link to='/ui&ux-design'>
                  <button className="text-white bg-red-800 px-10 py-2 text-base md:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className='w-full h-auto  flex flex-col p-3 gap-8 justify-center items-center md:flex-row md:gap-14 md:p-2 '>
            <div className="w-full md:w-[24%] h-auto md:h-[520px] mb-4 md:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] md:min-h-[230px] md:h-[30%] rounded-xl overflow-hidden">
                <img src={logo5} alt="digital marketing" className="w-full h-full object-cover rounded-xl -mb-px" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto md:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-1 md:mt-4 px-3">
                <h3 className="text-white text-lg md:text-2xl font-bold text-center">Digital Marketing</h3>
              </div>
              <div className="w-full flex-1 md:h-[20%] -mt-1 md:mt-3">
                <p className="text-white text-center px-3 md:px-5 text-base leading-normal">Digital marketing combines creativity with technology, using data-driven strategies—SEO, social media, and content—to connect directly with audiences.</p>
              </div>
              <div className="w-full h-auto md:h-[8%] flex justify-center items-center -mt-1 md:mt-3">
                <Link to="/digital-marketing">
                  <button className="text-white bg-red-800 px-10 py-2 text-base md:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>

            <div className="w-full md:w-[24%] h-auto md:h-[520px] mb-4 md:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] md:min-h-[230px] md:h-[30%] rounded-xl overflow-hidden">
                <img src={logo6} alt="graphic&videoediting" className="w-full h-full object-cover rounded-xl -mb-px" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto md:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-1 md:mt-4 px-3">
                <h3 className="text-white text-lg md:text-2xl font-bold text-center">Graphic & Video Editing</h3>
              </div>
              <div className="w-full flex-1 md:h-[20%] -mt-1 md:mt-3">
                <p className="text-white text-center px-3 md:px-5 text-base leading-normal">Graphic design and video editing are complementary creative fields focused on visual storytelling, with high demand for professionals in both fields.</p>
              </div>
              <div className="w-full h-auto md:h-[8%] flex justify-center items-center -mt-1 md:mt-3">
                <Link to="/graphic&videoediting">
                  <button className="text-white bg-red-800 px-10 py-2 text-base md:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto md:h-[580px] flex flex-col md:flex-row ">
          <div className="w-full md:w-1/2 h-auto md:h-full order-1 md:order-1 pl-16 ">
            <h2 className="text-white text-2xl md:text-4xl mt-6 md:mt-14 ml-4 md:ml-16 font-bold">Why Choose Us</h2>
            <p className="text-white text-xl md:text-base mt-6 md:mt-6 ml-4 md:ml-16">Dream Animex enables you to learn from industry experts with hands-on training, cutting-edge tools, and real-world projects. We offer career-focused programs in Graphic Design, Video Editing, UI/UX Design, and Digital Marketing for a successful creative future.</p>
            <ul className="text-white text-base md:text-lg mt-6 md:mt-6 ml-6 md:ml-20 list-disc space-y-2">
              <li>Live mentor-led classes</li>
              <li>Practical project-based learning</li>
              <li>Portfolio-focused training</li>
              <li>Beginner-friendly approach</li>
              <li>Career & freelancing guidance</li>
              <li>Flexible learning from home</li>
            </ul>
            <Link to="/about">
              <button className="rounded-full bg-red-800 text-white text-base md:text-lg mt-6 md:mt-8 ml-4 md:ml-16 px-4 md:px-5 py-2 mb-8">Read More</button>
            </Link>
          </div>

          <div className="w-full md:w-1/2 h-auto md:h-full order-2 md:order-2 flex justify-center items-center mt-8 md:mt-0 ">
            <img src={logo11} alt="Why Choose Us" className="w-[90%] md:w-[60%] h-auto md:h-[70%] rounded-2xl scale-105 hover:scale-110 transition-transform duration-700" />
          </div>
        </div>

        <FAQ />

        <Footer />
      </div>
    </div>
  );
}
export default Index;










