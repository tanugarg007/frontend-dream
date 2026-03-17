import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { serverUrl } from '../url/url';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || serverUrl;
const EnquiryModal = ({ isOpen, onClose }) => {
  const NAME_REGEX = /^[A-Za-z ]+$/;
  const FALLBACK_COURSES = [
    'Graphic Design',
    'UI/UX Design',
    'Video Editing',
    'Digital Marketing',
    'Graphic Design & Video Editing',
  ];
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', course: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState('');

  useEffect(() => {
    const loadCourses = async () => {
      setIsCoursesLoading(true);
      setCoursesError('');
      try {
        console.log("POST URL:", `${API_BASE_URL}/users/enquiry`);
        const response = await fetch(`${API_BASE_URL}/users/courses`);
        const data = await response.json().catch(() => []);
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        const activeOnly = list.filter((course) => {
          const status = String(course?.status || '').toLowerCase();
          return !status || status === 'active';
        });
        const titles = activeOnly
          .map((course) => course?.title || course?.name)
          .filter(Boolean);
        setCourses(titles.length ? titles : []);
      } catch (err) {
        setCoursesError('Unable to load courses. Showing default list.');
        setCourses(FALLBACK_COURSES);
      } finally {
        setIsCoursesLoading(false);
      }
    };

    loadCourses();
  }, []);

const handleChange = (e) => {
  const { name, value } = e.target;   // ✅ id → name
  setFormData(prev => ({ ...prev, [name]: value }));
  setErrors((prev) => ({ ...prev, [name]: '' }));
};

  const normalizePhone = (value) => {
    const digitsOnly = String(value || '').replace(/\D/g, '');
    return digitsOnly.length > 10 ? digitsOnly.slice(-10) : digitsOnly;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (!NAME_REGEX.test(formData.name.trim()))
      newErrors.name = 'Name can contain only letters and spaces';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(normalizePhone(formData.phone))) newErrors.phone = 'Please enter 10 digits';
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
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: normalizePhone(formData.phone),
        city: formData.city.trim(),
        course: formData.course.trim(),
        message: formData.message.trim(),
      };
      const response = await fetch(`${API_BASE_URL}/users/enquiry`
        , {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
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
            <input name="name" type="text"  id="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1">Email</label>
            <input name="email" type="email" id="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1">Contact Number</label>
            <PhoneInput
              country={'in'}
              enableSearch
              value={formData.phone}
              onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
              inputStyle={{
                width: '100%',
                height: '42px',
                borderRadius: '4px',
                border: '1px solid #d1d1db',
                
              }}
              buttonStyle={{
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px',
                border: '1px solid #d1d1db',
              
              }}
              containerStyle={{ width: '100%' }}
            />
            {showErrors && errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1">City</label>
            <input name="city" id="city" value={formData.city} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
            {showErrors && errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="mb-3">
            <label className="block text-sm font-bold mb-1"> Preferred Course</label>
            <select name="course" id="course" value={formData.course} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="">Select a course</option>
              {isCoursesLoading && <option disabled>Loading courses...</option>}
              {!isCoursesLoading && courses.length === 0 && (
                <option disabled>No courses available</option>
              )}
              {!isCoursesLoading &&
                (courses.length ? courses : FALLBACK_COURSES).map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
            </select>
            {coursesError && <p className="text-amber-600 text-sm">{coursesError}</p>}
            {showErrors && errors.course && <p className="text-red-500 text-sm">{errors.course}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Message</label>
            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-3 py-2 border rounded" />
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
