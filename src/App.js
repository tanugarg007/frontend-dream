
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
            <Navbar onEnquiryClick={() => setShowEnquiry(true)} />
            <RouteWatcher onOpen={() => setShowEnquiry(true)} />
            <Approutes/>
            <WhatsAppFloat />
            <EnquiryModal isOpen={showEnquiry} onClose={() => setShowEnquiry(false)} />
      </Router>
    </AuthProvider>
  );
}

export default App;
