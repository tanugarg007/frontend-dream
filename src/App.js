
import './App.css';

import Approutes from "./Routes/Approutes";
import Navbar from './Component/Navbar';
import EnquiryModal from './Component/EnquiryModal';
import WhatsAppFloat from './Component/WhatsAppFloat';
import { AuthProvider } from './context/AuthContext';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, useLocation } from "react-router-dom";

  function RouteWatcher({ onOpen }) {
    const location = useLocation();
    useEffect(() => {
      // Always start a new route from top of page.
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      if (location.pathname === '/' && !sessionStorage.getItem('enquiryShown')) {
        onOpen();
        sessionStorage.setItem('enquiryShown', '1');
      }
    }, [location, onOpen]);
    return null;
  }

function AppContent({ showEnquiry, setShowEnquiry }) {
  const location = useLocation();
  const hideNavbarPaths = ['/login'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname) && !isAdminRoute;

  return (
    <>
      {shouldShowNavbar && <Navbar onEnquiryClick={() => setShowEnquiry(true)} />}
      <RouteWatcher onOpen={() => setShowEnquiry(true)} />
      <Approutes />
      <WhatsAppFloat />
      <EnquiryModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
    </>
  );
}

function App() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    window.openEnquiry = () => setShowEnquiry(true);
    window.closeEnquiry = () => setShowEnquiry(false);
    return () => {
      try {
        delete window.openEnquiry;
        delete window.closeEnquiry;
      } catch (e) {}
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContent showEnquiry={showEnquiry} setShowEnquiry={setShowEnquiry} />
      </Router>
    </AuthProvider>
  );
}

export default App;
