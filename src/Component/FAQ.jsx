import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import logo13 from '../Images/faqsc.png';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className='w-[92%] mx-auto h-auto md:h-[520px] flex flex-col md:flex-row gap-4 md:gap-6'>
      <div className='w-full md:w-[39%] h-auto md:h-full flex justify-center md:justify-start items-center py-6 md:py-0 md:pl-20 '>
        <img src={logo13} alt='' className='w-[260px] h-[300px] md:w-[400px] md:h-[410px] rounded-2xl scale-105 hover:scale-110 transition-transform duration-700' />
      </div>
      <div className='w-full md:w-[61%] h-auto md:h-full'>
        <div className='w-full h-auto md:h-[24%]'>
          <div className="bg-white text-black w-[50px] h-[45px] rounded-lg flex justify-center items-center text-lg ml-4 md:ml-16 mt-2 ">
            FAQ
          </div>
          <h3 className="text-2xl md:text-3xl text-white font-bold ml-4 md:ml-16 mt-5">
            Frequently Asked Questions
          </h3>
        </div>
        <div className='w-full h-auto md:h-[75%] mt-4 md:mt-0  px-4 md:px-16'>
          <div className={`w-full relative py-2 cursor-pointer transition-colors duration-300 mt-1 
    ${
      hoverIndex === 0 && openIndex !== 0
        ? "text-blue-400"
        : openIndex === 0 && hoverIndex === 0
        ? "text-blue-400"
        : "text-white"
    }`}
            onMouseEnter={() => setHoverIndex(0)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setOpenIndex(openIndex === 0 ? null : 0)}
          >
            <p className="text-base md:text-xl pr-10">
              01.  What courses does Dream Animex offer?
            </p>

            <span
              className={`absolute right-2 md:right-1 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 0 && openIndex !== 0
          ? "text-blue-400"
          : openIndex === 0 && hoverIndex === 0
          ? "text-blue-400"
          : "text-white"
      }`}
            >
              {openIndex === 0 ? <FaMinus /> : <FaPlus />}
            </span>

            {openIndex === 0 && (
              <p
                className="text-sm md:text-base mt-2 leading-relaxed text-white"
                onMouseEnter={() => setHoverIndex(null)}
              >
                We offer professional courses in Graphic Design, Video Editing, Digital Marketing, UI & UX Design,
                and a combined Graphic + Video Editing program. Each course includes practical training and
                real-world projects.
              </p>
            )}

            <hr className="border-stone-400 w-full mt-3" />
          </div>
          <div
            className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 1
        ? "text-blue-400"
        : "text-white"
    }`}
            onMouseEnter={() => setHoverIndex(1)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setOpenIndex(openIndex === 1 ? null : 1)}
          >
            <p className="text-base md:text-xl pr-10">
              02. Is Dream Animex only an institute or also a studio?
            </p>

            <span
              className={`absolute right-2 md:right-1 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 1
          ? "text-blue-400"
          : "text-white"
      }`}
            >
              {openIndex === 1 ? <FaMinus /> : <FaPlus />}
            </span>

            {openIndex === 1 && (
              <p
                className="text-sm md:text-base mt-2 leading-relaxed text-white"
                onMouseEnter={() => setHoverIndex(null)}
              >
                We are both a training institute and a creative studio. Students gain exposure to real studio-level
                projects and industry workflows during their learning process.
              </p>
            )}

            <hr className="border-stone-400 w-full mt-3" />
          </div>
          <div
            className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 2
        ? "text-blue-400"
        : "text-white"
    }`}
            onMouseEnter={() => setHoverIndex(2)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setOpenIndex(openIndex === 2 ? null : 2)}
          >
            <p className="text-base md:text-xl pr-10">
              03.Do I need prior experience to join?
            </p>

            <span
              className={`absolute right-2 md:right-1 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 2
          ? "text-blue-400"
          : "text-white"
      }`}
            >
              {openIndex === 2 ? <FaMinus /> : <FaPlus />}
            </span>

            {openIndex === 2 && (
              <p
                className="text-sm md:text-base mt-2 leading-relaxed text-white"
                onMouseEnter={() => setHoverIndex(null)}
              >
                No prior experience is required. Our courses start from the basics and gradually move to advanced
                levels, making them suitable for beginners and skill upgraders.
              </p>
            )}

            <hr className="border-stone-400 w-full mt-3" />
          </div>
          <div
            className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 3
        ? "text-blue-400"
        : "text-white"
    }`}
            onMouseEnter={() => setHoverIndex(3)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setOpenIndex(openIndex === 3 ? null : 3)}
          >
            <p className="text-base md:text-xl pr-10">
              04. Will I work on real projects during the course?
            </p>

            <span
              className={`absolute right-2 md:right-1 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 3
          ? "text-blue-400"
          : "text-white"
      }`}
            >
              {openIndex === 3 ? <FaMinus /> : <FaPlus />}
            </span>

            {openIndex === 3 && (
              <p
                className="text-sm md:text-base mt-2 leading-relaxed text-white"
                onMouseEnter={() => setHoverIndex(null)}
              >
                Yes. We focus on practical learning. Students work on live assignments, portfolio projects, and
                industry-based tasks to gain hands-on experience.

              </p>
            )}

            <hr className="border-stone-400 w-full mt-3" />
          </div>
          <div
            className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 4
        ? "text-blue-400"
        : "text-white"
    }`}
            onMouseEnter={() => setHoverIndex(4)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setOpenIndex(openIndex === 4 ? null : 4)}
          >
            <p className="text-base md:text-xl pr-10">
              05. Do you provide software with the course?
            </p>

            <span
              className={`absolute right-2 md:right-1 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 4
          ? "text-blue-400"
          : "text-white"
      }`}
            >
              {openIndex === 4 ? <FaMinus /> : <FaPlus />}
            </span>

            {openIndex === 4 && (
              <p
                className="text-sm md:text-base mt-2 leading-relaxed text-white"
                onMouseEnter={() => setHoverIndex(null)}
              >
                Students will be guided step-by-step to install legal or trial versions of all required software.
                Software licenses are not included in the course fees, and students must purchase full licenses
                separately if needed.
              </p>
            )}

            <hr className="border-stone-400 w-full mt-3" />
          </div>
          <div
            className={`w-full relative py-2 cursor-pointer transition-colors duration-300
    ${
      hoverIndex === 5
        ? "text-blue-400"
        : "text-white"
    }`}
            onMouseEnter={() => setHoverIndex(5)}
            onMouseLeave={() => setHoverIndex(null)}
            onClick={() => setOpenIndex(openIndex === 5 ? null : 5)}
          >
            <p className="text-base md:text-xl pr-10">
              06. Do you provide certificates after course completion?
            </p>

            <span
              className={`absolute right-2 md:right-1 top-3 text-xl md:text-2xl transition-colors duration-300
      ${
        hoverIndex === 5
          ? "text-blue-400"
          : "text-white"
      }`}
            >
              {openIndex === 5 ? <FaMinus /> : <FaPlus />}
            </span>

            {openIndex === 5 && (
              <p
                className="text-sm md:text-base mt-2 leading-relaxed text-white"
                onMouseEnter={() => setHoverIndex(null)}
              >
                Yes. Students receive a course completion certificate after successfully finishing their training and
                projects. The certificate can be used to strengthen portfolios and job applications.
              </p>
            )}

            <hr className="border-stone-400 w-full mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
