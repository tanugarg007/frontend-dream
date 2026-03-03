import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', course: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[-\s]/g, ''))) newErrors.phone = 'Please enter 10 digits';
    if(!formData.course.trim()) newErrors.course = 'Course is required';
    if(!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length !== 0) { setErrors(newErrors); setShowErrors(true); return; }
    try {
      const response = await fetch(`${API_BASE_URL}/users/enquiry`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Enquiry submit failed');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Enquiry error:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  if (isSubmitted) return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md">
        <h3 className="text-2xl font-bold text-cyan-900 mb-4">🎉 Enquiry Submitted!</h3>
        <p className="mb-4">Thank you. We'll get back to you shortly.</p>
        <button onClick={() => { setIsSubmitted(false); onClose(); }} className="px-4 py-2 bg-red-600 text-white rounded">Close</button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-60" onClick={onClose}></div>
      <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md z-50">
        <h3 className="text-2xl font-bold text-cyan-900 mb-4">Enquiry Now</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1"> Full Name</label>
            <input id="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1">Email</label>
            <input id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1">Contact Number</label>
            <input id="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1">City</label>
            <input id="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1"> Preferred Course</label>
            <select id="course" value={formData.course} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Select a course</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Video Editing">Video Editing</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Graphic + Video Editing">Graphic Design & Video Editing</option>
            </select>
            {showErrors && errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Message</label>
            <textarea id="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
