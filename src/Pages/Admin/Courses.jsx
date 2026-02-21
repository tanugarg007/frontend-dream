import React, { useEffect, useState } from 'react';

const initialFormData = {
  name: '',
  duration: '',
  fee: '',
  category: 'Graphic Design',
  seats: '',
  startDate: '',
  description: '',
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const COURSES_API = `${API_BASE_URL}/users/courses`;
const ENQUIRY_COURSE_OPTIONS = [
  'Graphic Design',
  'UI/UX Design',
  'Digital Marketing',
  'Graphic + UI/UX Design',
  'Video Editing',
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [apiError, setApiError] = useState('');

  const categories = ENQUIRY_COURSE_OPTIONS;

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadCourses = async () => {
    try {
      setApiError('');
      const response = await fetch(COURSES_API, {
        headers: {
          ...getAuthHeaders(),
        },
      });
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to load courses');
      }

      const parsedCourses = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setCourses(parsedCourses);
    } catch (error) {
      setApiError(error.message || 'Failed to load courses');
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      setApiError('');
      setIsDeletingId(id);
      const response = await fetch(`${COURSES_API}/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
        },
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to delete course');
      }

      await loadCourses();
    } catch (error) {
      setApiError(error.message || 'Failed to delete course');
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Course name is required';
    if (!formData.duration.trim()) nextErrors.duration = 'Duration is required';
    if (!formData.category.trim()) nextErrors.category = 'Category is required';
    if (!formData.fee || Number(formData.fee) <= 0) nextErrors.fee = 'Enter a valid fee';
    if (formData.seats && Number(formData.seats) <= 0) nextErrors.seats = 'Seats must be positive';
    if (!formData.startDate) nextErrors.startDate = 'Start date is required';

    return nextErrors;
  };

  const toPayload = () => ({
    title: formData.name.trim(),
    description: formData.description.trim(),
    category: formData.category.trim(),
    fee: formData.fee ? Number(formData.fee) : undefined,
    duration: formData.duration.trim() || undefined,
    seats: formData.seats ? Number(formData.seats) : undefined,
    startDate: formData.startDate || undefined,
  });

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setApiError('');
      setIsSaving(true);

      const response = await fetch(COURSES_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(toPayload()),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to save course');
      }

      setCourses((prev) => [data, ...prev]);

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      setApiError(error.message || 'Failed to save course');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Courses Management</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="rounded bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
        >
          Add New Course
        </button>
      </div>

      {apiError && <p className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">{apiError}</p>}

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{course.id}</td>
                <td className="px-4 py-3 font-medium">{course.title || course.name}</td>
                <td className="px-4 py-3">{course.duration || 'N/A'}</td>
                <td className="px-4 py-3">
                  <button
                    className="ml-5 text-gray-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Delete"
                    disabled={isDeletingId === course.id}
                    onClick={() => handleDelete(course.id)}
                  >
                    {isDeletingId === course.id ? '...' : '🗑️'}
                  </button>
                </td>
              </tr>
            ))}
            {!isLoading && courses.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
            {isLoading && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  Loading courses...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900">Add New Course</h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmitCourse} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
                  Course Name
                </label>
                <select
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select course</option>
                  {ENQUIRY_COURSE_OPTIONS.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="duration">
                  Duration
                </label>
                <input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="Ex: 3 months"
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.duration && <p className="mt-1 text-xs text-red-600">{errors.duration}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="fee">
                  Fee (INR)
                </label>
                <input
                  id="fee"
                  name="fee"
                  type="number"
                  min="1"
                  value={formData.fee}
                  onChange={handleInputChange}
                  placeholder="Ex: 12000"
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.fee && <p className="mt-1 text-xs text-red-600">{errors.fee}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="seats">
                  Seats (optional)
                </label>
                <input
                  id="seats"
                  name="seats"
                  type="number"
                  min="1"
                  value={formData.seats}
                  onChange={handleInputChange}
                  placeholder="Ex: 30"
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.seats && <p className="mt-1 text-xs text-red-600">{errors.seats}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                {errors.startDate && <p className="mt-1 text-xs text-red-600">{errors.startDate}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="description">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short course summary"
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="mt-2 flex justify-end gap-3 md:col-span-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="rounded border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded bg-sky-600 px-5 py-2 font-medium text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-300"
                >
                  {isSaving ? 'Saving...' : 'Save Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
