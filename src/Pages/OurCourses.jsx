import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo9 from '../Images/page-background.JPG'
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import logo8 from '../Images/insidegraphic.png'
import logo7 from '../Images/insidevideo.png'
import logo6 from '../Images/insideuiux.png'
import logo10 from '../Images/insidedigital.png'
import logo11 from '../Images/insidegraphicvideo.png'
const OurCourses =()=>{
    const [showPopup, setShowPopup] = useState(false);
    return(
      <div>
        <div className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat md:min-h-screen  " style={{ backgroundImage: `url(${logo9})` }}>
         

       <div className="w-full h-[50px]  mt-20"></div>

      <div className="w-full h-[60px] md:h-[90px] border border-white mt-5 flex justify-center items-center bg-white">
         <h2 className=" text-3xl md:text-5xl text-red-800 font-bold text-center ">
           Our Courses
            </h2>
</div>

          <div className="w-full mt-5">
  
  {/* ROW 1 */}
  <div className="w-full flex flex-col md:flex-row gap-8 py-3 px-4 md:px-8">
    
    {/* CARD 1 */}
    <div className="group w-full md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50 flex flex-col">
      <div className="w-full overflow-hidden relative bg-gray-900/40">
        <img src={logo8} alt='' className="block w-full h-auto object-contain object-center group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="w-full px-6 py-1 min-h-[56px] flex items-center bg-gradient-to-r from-gray-900 to-gray-800">
        <h2 className="text-2xl lg:text-2xl text-white font-bold">
          Graphic Design (4 Months)
        </h2>
      </div>

      <div className="w-full px-6 py-1 flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/30">
        <Link to="/graphic-design">
          <button className="group/btn flex items-center text-white hover:text-purple-400">
            <span className="text-xl" >View Course</span>
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300 mt-2"></i>
          </button>
        </Link>
      </div>
    </div>

    {/* CARD 2 */}
    <div className="group w-full md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50 flex flex-col">
      <div className="w-full overflow-hidden relative bg-gray-900/40">
        <img src={logo7} alt='' className="block w-full h-auto object-contain object-center group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="w-full px-6 py-1 min-h-[56px] flex items-center">
        <h2 className="text-2xl lg:text-2xl text-white font-bold">
          Video Editing (4 Months)
        </h2>
      </div>

       <div className="w-full px-6 py-1 flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/30">
        <Link to="/video-editing">
          <button className="group/btn flex items-center text-white hover:text-purple-400">
            <span className="text-xl" >View Course</span>
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300 mt-2"></i>
          </button>
        </Link>
      </div>
    </div>

    {/* CARD 3 */}
    <div className="group w-full md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50 flex flex-col">
      <div className="w-full overflow-hidden relative bg-gray-900/40">
        <img src={logo6} alt='' className="block w-full h-auto object-contain object-center group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="w-full px-6 py-1 min-h-[56px] flex items-center">
        <h2 className="text-2xl lg:text-2xl text-white font-bold">
          UI & UX Design(4 Months)
        </h2>
      </div>

       <div className="w-full px-6 py-1 flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/30">
        <Link to="/ui&ux-design">
          <button className="group/btn flex items-center text-white hover:text-purple-400">
            <span className="text-xl" >View Course</span>
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300 mt-2"></i>
          </button>
        </Link>
      </div>
    </div>
  </div>

  {/* ROW 2 */}
  <div className="w-full flex flex-col md:flex-row gap-8 py-3 px-4 md:px-8">
     <div className="group w-full md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50 flex flex-col">
      <div className="w-full overflow-hidden relative bg-gray-900/40">
        <img src={logo10} alt='' className="block w-full h-auto object-contain object-center -mb-px group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="w-full px-6 py-1 min-h-[56px] flex items-center">
        <h2 className="text-2xl lg:text-2xl  text-white font-bold">
          Digital Marketing (6 Months)
        </h2>
      </div>

      <div className="w-full px-6 py-1 min-h-[48px] flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/30">
        <Link to="/digital-marketing" className="w-full">
          <button className="group/btn flex items-center text-white hover:text-purple-400">
            <span className="text-xl" >View Course</span>
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300"></i>
          </button>
        </Link>
      </div>
    </div>
     <div className="group w-full md:w-1/3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl hover:shadow-white hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-700/50 flex flex-col">
      <div className="w-full overflow-hidden relative bg-gray-900/40">
        <img src={logo11} alt='' className="block w-full h-auto object-contain object-center group-hover:scale-105 transition-transform duration-700" />
      </div>

      <div className="w-full px-6 py-1 min-h-[56px] flex items-center">
        <h2 className="text-2xl lg:text-2xl text-white font-bold">
          Graphic Design and Video Editing (6 Months)
        </h2>
      </div>

       <div className="w-full px-6 py-1 flex items-center bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700/30">
        <Link to="/graphic&videoediting">
          <button className="group/btn flex items-center text-white hover:text-purple-400">
            <span className="text-xl" >View Course</span>
            <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform duration-300 mt-2"></i>
          </button>
        </Link>
      </div>
    </div>
  </div>

</div>
<Footer />
</div>
</div>
               
    )
}
export default OurCourses
