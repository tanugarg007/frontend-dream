import React, { useState } from 'react';
import Footer from '../Component/Footer';
const logo9 = `${PUBLIC_URL}/Images/background.jpg`;

const StudioDivision = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full">

      {/* BACKGROUND SECTION */}
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center bg-no-repeat pt-[140px]"
        style={{ backgroundImage: `url(${logo9})`, backgroundAttachment: 'fixed' }}
      >

        {/* ================= HEADER ================= */}
       

        {/* ================= STUDIO DIVISION BOX ================= */}
        <div className="w-full flex justify-center relative z-40">
          <div className="w-[95%] md:w-[85%]
            bg-white/90 backdrop-blur-xl
            rounded-2xl shadow-2xl
            border-l-8 border-red-800
            px-8 md:px-14 py-10">

            <div className="flex flex-col md:flex-row gap-10">

              {/* LEFT */}
              <div className="md:w-[35%]">
               
                <h2 className="text-4xl font-extrabold text-gray-900 mt-2">
                  Studio Division
                </h2>
                 <p className="text-red-800 uppercase tracking-widest text-sm font-semibold mt-3">
                  Creative Production Wing
                </p>
              </div>

              {/* RIGHT */}
              <div className="md:w-[65%] text-gray-700 leading-relaxed">
                <p>
                Dream Animex Studio is the creative production wing of our institute, working on real-world design,
animation, video, and digital media projects. The studio collaborates on commercial and creative
assignments, providing students with exposure to industry workflows and professional standards. We are
always open to collaborating with skilled creatives and reviewing portfolios for freelance or project-based
opportunities.

                </p>

                
              </div>
            </div>

            <div className="w-full h-px bg-gray-200 my-8"></div>

            <div className="flex   justify-end  ">
             
           <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=info.dreamanimex@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-red-800 text-white font-bold hover:bg-yellow-600"
            >
               info.dreamanimex@gmail.com
            </a>




            </div>

          </div>
        </div>
          <Footer />
                   
                          </div>
                         </div>
                        
                      );
                    };
                    
                  

export default StudioDivision;









