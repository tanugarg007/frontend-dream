import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../Component/Navbar";
import FAQ from "../Component/FAQ";
import Footer from "../Component/Footer";

const PUBLIC_URL = process.env.PUBLIC_URL || '';
const logo7 = `${PUBLIC_URL}/Images/graphic.png`;
const logo11 = `${PUBLIC_URL}/Images/choose.png`;
const logo3 = `${PUBLIC_URL}/Images/video.png`;
const logo4 = `${PUBLIC_URL}/Images/uiandux.png`;
const logo5 = `${PUBLIC_URL}/Images/digital.png`;
const logo6 = `${PUBLIC_URL}/Images/gv.png`;
const logo9 = `${PUBLIC_URL}/Images/page-background.jpg`;
const logo10 = `${PUBLIC_URL}/Images/slider.jpg`;




const Index = () => {
 

  return (
    <div className="w-full ">
    <div
  className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat lg:min-h-screen"
  style={{ backgroundImage: `url(${logo9})`, backgroundAttachment: 'fixed' }}
>
        <Navbar onEnquiryClick={() => window.openEnquiry?.()} />
        <div className="w-full  mt-[70px]">
          <img src={logo10} alt="animex" className="w-full" />
        </div>

        <div className='w-full h-24  flex justify-center items-center'>
          <h2 className="text-white text-4xl lg:text-5xl font-bold text-center">COURSES</h2>
        </div>

        <div className='w-full h-auto  top-[664px] left-0 '>
          <div className='w-full h-auto  flex flex-col p-3 gap-8 justify-center items-center lg:flex-row lg:gap-14 lg:p-3 '>
            {/* First row */}
            <div className="w-full lg:w-[24%] h-auto lg:h-[520px] mb-4 lg:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] lg:min-h-[230px] lg:h-[30%] rounded-xl overflow-hidden">
                <img
                  src={logo7}
                  className="w-full h-full object-cover  rounded-xl -mb-px course-image-mobile-crop"
                  alt="Graphic Design "
                  style={{ aspectRatio: '1/1' }}
                />
              </div>
              <div className="w-full h-auto lg:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:-mt-[6rem] lg:mt-4 px-3">
                <h3 className="text-white text-lg lg:text-2xl font-bold text-center">Graphic Design</h3>
              </div>
              <div className="w-full flex-1 lg:h-[20%] mt-1 md:mt-1 lg:mt-3">
                <p className="text-white text-center px-3 lg:px-5 text-base leading-5 lg:leading-normal">Graphic design is the visual communication of ideas through typography, imagery, and color, focusing on balancing aesthetics with functionality.</p>
              </div>
              <div className="w-full h-auto lg:h-[8%] flex justify-center items-center mt-3 md:mt-1 lg:mt-3">
                <Link to='/graphic-design'>
                  <button className="text-white bg-red-800 px-10 py-2 text-base lg:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[24%] h-auto lg:h-[520px] mb-4 lg:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] lg:min-h-[230px] lg:h-[30%] rounded-xl overflow-hidden">
                <img src={logo3} alt="video editing" className="w-full h-full object-cover rounded-xl -mb-px course-image-mobile-crop" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto lg:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:-mt-[6rem] lg:mt-4 px-3">
                <h3 className="text-white text-lg lg:text-2xl font-bold text-center">Video Editing</h3>
              </div>
              <div className="w-full flex-1 lg:h-[20%] mt-1 md:mt-1 lg:mt-3">
                <p className="text-white text-center px-3 lg:px-5 text-base leading-5 lg:leading-normal">Video editing involves manipulating video and audio to create a compelling narrative, utilizing techniques like B-roll for context, color correction for consistency, and cutting to pacing.</p>
              </div>
              <div className="w-full h-auto lg:h-[8%] flex justify-center items-center mt-3 md:mt-1 lg:mt-3">
                <Link to='/video-editing'>
                  <button className="text-white bg-red-800 px-10 py-2 text-base lg:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[24%] h-auto lg:h-[520px] mb-4 lg:mb-0 border-[4px] border-white  rounded-2xl p-3 flex flex-col">
              <div className="w-full min-h-[240px] lg:min-h-[230px] lg:h-[30%] rounded-xl overflow-hidden">
                <img src={logo4} alt="ui/ux design" className="w-full h-full object-cover  rounded-xl -mb-px course-image-mobile-crop" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto lg:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:-mt-[6rem] lg:mt-4 px-3">
                <h3 className="text-white text-lg lg:text-2xl font-bold text-center">UI & UX Design</h3>
              </div>
              <div className="w-full flex-1 lg:h-[20%] mt-1 md:mt-1 lg:mt-3">
                <p className="text-white text-center px-3 lg:px-5 text-base leading-5 lg:leading-normal">UI/UX design focuses on creating intuitive, user-centered digital experiences where functionality meets aesthetics.</p>
              </div>
              <div className="w-full h-auto lg:h-[8%] flex justify-center items-center mt-3 md:mt-1 lg:mt-3">
                <Link to='/ui&ux-design'>
                  <button className="text-white bg-red-800 px-10 py-2 text-base lg:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Second row */}
          <div className='w-full h-auto  flex flex-col p-3 gap-8 justify-center items-center lg:flex-row lg:gap-14 lg:p-2 '>
            <div className="w-full lg:w-[24%] h-auto lg:h-[520px] mb-4 lg:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] lg:min-h-[230px] lg:h-[30%] rounded-xl overflow-hidden">
                <img src={logo5} alt="digital marketing" className="w-full h-full object-cover rounded-xl -mb-px course-image-mobile-crop" style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto lg:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:-mt-[6rem] lg:mt-4 px-3">
                <h3 className="text-white text-lg lg:text-2xl font-bold text-center">Digital Marketing</h3>
              </div>
              <div className="w-full flex-1 lg:h-[20%] mt-1 md:mt-1 lg:mt-3">
                <p className="text-white text-center px-3 lg:px-5 text-base leading-5 lg:leading-normal">Digital marketing combines creativity with technology, using data-driven strategies—SEO, social media, and content—to connect directly with audiences.</p>
              </div>
              <div className="w-full h-auto lg:h-[8%] flex justify-center items-center mt-2 md:mt-1 lg:mt-3">
                <Link to="/digital-marketing">
                  <button className="text-white bg-red-800 px-10 py-2 text-base lg:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-[24%] h-auto lg:h-[520px] mb-4 lg:mb-0 border-[4px] border-white rounded-2xl p-3 flex flex-col ">
              <div className="w-full min-h-[240px] lg:min-h-[230px] lg:h-[30%] rounded-xl overflow-hidden">
                <img src={logo6} alt="graphic&videoediting" className="w-full h-full object-cover rounded-xl -mb-px course-image-mobile-crop  " style={{ aspectRatio: '1/1' }} />
              </div>
              <div className="w-full h-auto lg:h-[12%] border border-yellow-500 rounded-full bg-[#6C757D] flex justify-center items-center -mt-12 md:-mt-[6rem] lg:mt-4 px-3">
                <h3 className="text-white text-lg lg:text-2xl font-bold text-center">Graphic & Video Editing</h3>
              </div>
              <div className="w-full flex-1 lg:h-[20%] mt-1 md:mt-1 lg:mt-3">
                <p className="text-white text-center px-3 lg:px-5 text-base leading-5 lg:leading-normal">Graphic design and video editing are complementary creative fields focused on visual storytelling, with high demand for professionals in both fields.</p>
              </div>
              <div className="w-full h-auto lg:h-[8%] flex justify-center items-center mt-1 md:mt-1 lg:mt-3">
                <Link to="/graphic&videoediting">
                  <button className="text-white bg-red-800 px-10 py-2 text-base lg:text-lg rounded-full hover:bg-yellow-600 transition-all">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto lg:h-[580px] flex flex-col lg:flex-row mb-8 lg:mb-0">
          <div className="w-full lg:w-1/2 h-auto lg:h-full order-2 lg:order-1 px-4 lg:px-0 lg:pl-16">
            <h2 className="text-white text-3xl lg:text-5xl mt-5 lg:mt-14 ml-0 lg:ml-16 font-bold text-center lg:text-left">Why Choose Us</h2>
            <p className="text-white text-base lg:text-base mt-4 lg:mt-6 ml-0 lg:ml-16 text-center lg:text-left leading-relaxed">Dream Animex enables you to learn from industry experts with hands-on training, cutting-edge tools, and real-world projects. We offer career-focused programs in Graphic Design, Video Editing, UI/UX Design, and Digital Marketing for a successful creative future.</p>
            <ul className="text-white text-base lg:text-lg mt-4 lg:mt-6 ml-10 lg:ml-20 list-disc space-y-2">
              <li>Live mentor-led classes</li>
              <li>Practical project-based learning</li>
              <li>Portfolio-focused training</li>
              <li>Beginner-friendly approach</li>
              <li>Career & freelancing guidance</li>
              <li>Flexible learning from home</li>
            </ul>
            <div className="flex justify-center lg:justify-start">
              <Link to="/about">
                <button className="rounded-full bg-red-800 text-white text-base lg:text-lg mt-5 lg:mt-8 ml-0 lg:ml-16 px-4 lg:px-5 py-2 mb-8">Read More</button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-auto lg:h-full order-1 lg:order-2 flex justify-center items-center mt-5 lg:mt-0 ">
            <img src={logo11} alt="Why Choose Us" className="w-[82%] lg:w-[60%] h-auto lg:h-[70%] rounded-2xl scale-105 hover:scale-110 transition-transform duration-700" />
          </div>
        </div>

        <FAQ />

        <Footer />
      </div>
    </div>
  );
}
export default Index;




















