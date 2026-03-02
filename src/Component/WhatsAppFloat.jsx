import React from 'react';
import whatsappImg from '../Assets/whatsapp.png';
import { useLocation } from 'react-router-dom';
const WhatsAppFloat = () => {
  const location = useLocation();
   if (location.pathname.startsWith('/admin')) {
    return null;
  }
  return (
    <div className="fixed bottom-1 right-1 z-50">
      <a
        href="https://wa.me/919888695595"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="block w-16 h-16"
      >
        <img src={whatsappImg} alt="WhatsApp" className="w-full h-full object-contain" />
      </a>
    </div>
  );
};

export default WhatsAppFloat;
