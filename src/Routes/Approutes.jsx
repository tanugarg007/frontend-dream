 import { Route, Routes } from "react-router-dom";
 import Index from "../Pages/Index";
 import About from "../Pages/About";
 import OurCourses from '../Pages/OurCourses';
 import GraphicDesign from '../Component/GraphicDesign';
 import VideoEditing from '../Component/VideoEditing';
import UIUXDesign from '../Component/UIUXDesign';
import DigitalMarketing from '../Component/DigitalMarketing';
import GraphicandUIUX from '../Component/GraphicandUIUX';
import ContactUs from "../Pages/ContactUs";
import StudioDivision from "../Pages/StudioDivision";
 const Approutes = () => {
   return (
    <Routes>
    <Route path="/" element={<Index />} /> 
    <Route path='/about' element={<About />} />
    <Route path='/courses' element={<OurCourses />} />
    <Route path='/contact' element={<ContactUs />} />
    <Route path='/studio-division' element={<StudioDivision />} />
    <Route path='/graphic-design' element={<GraphicDesign />} />
    <Route path='/video-editing' element={<VideoEditing />} />
    <Route path='/ui&ux-design' element={<UIUXDesign/>}/>
    <Route path="/digital-marketing" element={<DigitalMarketing />} />
    <Route path="graphic&uiux" element={<GraphicandUIUX />} />
 </Routes>
   );
 };

 export default Approutes;

