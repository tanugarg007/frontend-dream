import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Public Pages
import Index from '../Pages/Index';
import About from '../Pages/About';
import ContactUs from '../Pages/ContactUs';
import OurCourses from '../Pages/OurCourses';
import StudioDivision from '../Pages/StudioDivision';
import Login from '../Pages/Admin/Login';

// Course Pages
import GraphicDesign from '../Component/GraphicDesign';
import VideoEditing from '../Component/VideoEditing';
import UIUXDesign from '../Component/UIUXDesign';
import DigitalMarketing from '../Component/DigitalMarketing';
import GraphicandVideoEditing from '../Component/GraphicandVideoEditing';

// Admin Pages
import AdminLayout from '../Pages/Admin/AdminLayout';
import Dashboard from '../Pages/Admin/Dashboard';
import Courses from '../Pages/Admin/Courses';
import Enquires from '../Pages/Admin/Enquires';
import Settings from '../Pages/Admin/Settings';

function AppRoutes() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/our-courses" element={<OurCourses />} />
        <Route path="/studio-division" element={<StudioDivision />} />
        <Route path="/login" element={<Login />} />
        
        {/* Course Routes */}
        <Route path="/graphic-design" element={<GraphicDesign />} />
        <Route path="/video-editing" element={<VideoEditing />} />
        <Route path="/ui&ux-design" element={<UIUXDesign />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/graphic&videoediting" element={<GraphicandVideoEditing />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} /> {/* /admin → Dashboard */}
          <Route path="courses" element={<Courses />} />
          <Route path="enquiries" element={<Enquires />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Page - Optional */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
  );
}

export default AppRoutes;
