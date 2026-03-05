import React, { useState, useEffect } from 'react';
import { serverUrl } from '../../url/url';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || serverUrl; // fallback to serverUrl from url.js if env var is not set
const COURSE_API = `${API_BASE_URL}/users/course`;      // singular – for POST (create)
const COURSES_API = `${API_BASE_URL}/users/courses`;    // plural – for PUT (update) and DELETE

const CoursesModal = ({ isOpen, onClose, onCourseSaved, editingCourse }) => {
  const [formData, setFormData] = useState({ name: '', duration: '', });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState('');

  const isEditMode = !!editingCourse;

  // Pre-fill form when editingCourse changes
  useEffect(() => {
    if (editingCourse) {
      setFormData({
        name: editingCourse.name || editingCourse.title || '',
        duration: editingCourse.duration || '',
        // description: editingCourse.description || '',
        // heading: editingCourse.heading || '',
      });
    } else {
      setFormData({ name: '', duration: '', });
    }
    setErrors({});
    setApiError('');
  }, [editingCourse]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
  const newErrors = {};

  if (!formData.name.trim())
    newErrors.name = "Course name is required";

  // if (!formData.heading.trim())
  //   newErrors.heading = "Heading is required";

  if (!formData.duration.trim())
    newErrors.duration = "Duration is required";

  return newErrors;
};
//  console.log("FORM SUBMIT HO REHA");
  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSaving(true);
  setApiError("");

  try {
    let url;
    let method;

 if (isEditMode && editingCourse?.id) {
  url = `${COURSES_API}/${editingCourse.id}`;
  method = "PATCH";
} else {
  url = COURSE_API;   // ✅ correct (singular)
  method = "POST";
}

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify({
        title: formData.name.trim(),
        duration: formData.duration.trim(),
        // description: formData.description.trim(),
        // heading: formData.heading.trim(),
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Something went wrong");
    }

    const savedCourse = responseData.data || responseData;

    onCourseSaved(savedCourse);
    onClose();

    setFormData({
      name: "",
      duration: "",
      // description: "",
      // heading: "",
    });

  } catch (error) {
    console.error("Save course error:", error);
    setApiError(error.message);
  } finally {
    setIsSaving(false);
  }
};

  const resetForm = () => {
    setFormData({ name: '', duration: '',  });
    setErrors({});
    setApiError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">
            {isEditMode ? 'Edit Course' : 'Add New Course'}
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        {apiError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            <strong>Error:</strong> {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="modal-name">
              Course Name *
            </label>
            <input
              id="modal-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Full Stack Web Development"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              required
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
             {/* <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="modal-name">
              Heading *
            </label>
            <input
              id="modal-heading"
              name="heading"
              type="text"
              value={formData.heading}
              onChange={handleChange}
              placeholder="e.g., Full Stack Web Development"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              required
            />
            {errors.heading && <p className="mt-1 text-xs text-red-600">{errors.heading}</p>}
          </div> */}
          <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="modal-duration">
              Duration *
            </label>
            <input
              id="modal-duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g., 6 months"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              required
            />
            {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration}</p>}
          </div>

          {/* <div className="md:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="modal-description">
              Description (optional)
            </label>
            <textarea
              id="modal-description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief overview of the course"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
            />
          </div> */}

          <div className="mt-2 flex justify-end gap-3 md:col-span-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-slate-900 px-5 py-2 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
            >
              {isSaving ? 'Saving...' : (isEditMode ? 'Update Course' : 'Save Course')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursesModal;