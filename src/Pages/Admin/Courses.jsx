import React, { useState } from 'react';

const initialFormData = {
  name: '',
  duration: '',
  fee: '',
  category: 'Manga',
  seats: '',
  startDate: '',
  description: '',
};

const Courses = () => {
  const [courses, setCourses] = useState([
    // { id: 1, name: 'Animation Basics', duration: '6 months', fee: 9999, category: 'Animation' },
    // { id: 2, name: 'Digital Art Pro', duration: '4 months', fee: 6999, category: 'Digital' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const categories = ['Manga', 'Digital', 'Character', 'Animation'];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter((c) => c.id !== id));
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

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const newCourse = {
      id: courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1,
      name: formData.name.trim(),
      duration: formData.duration.trim(),
      fee: Number(formData.fee),
      category: formData.category,
      seats: formData.seats ? Number(formData.seats) : null,
      startDate: formData.startDate,
      description: formData.description.trim(),
    };

    setCourses((prev) => [newCourse, ...prev]);
    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Courses Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded bg-sky-600 px-4 py-2 text-white transition hover:bg-sky-700"
        >
          Add New Course
        </button>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Course Name</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Fee (INR)</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{course.id}</td>
                <td className="px-4 py-3 font-medium">{course.name}</td>
                <td className="px-4 py-3">{course.duration}</td>
                <td className="px-4 py-3">INR {course.fee}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{course.category}</span>
                </td>
                <td className="px-4 py-3">
                  <button className="mr-2 text-gray-600 hover:text-sky-600" title="Edit">
                    Edit
                  </button>
                  <button
                    className="mr-2 text-gray-600 hover:text-red-600"
                    title="Delete"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                  <button className="text-gray-600 hover:text-sky-600" title="View">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No courses found.
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

            <form onSubmit={handleCreateCourse} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="name">
                  Course Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Motion Graphics Mastery"
                  className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
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
                  className="rounded bg-sky-600 px-5 py-2 font-medium text-white transition hover:bg-sky-700"
                >
                  Save Course
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
