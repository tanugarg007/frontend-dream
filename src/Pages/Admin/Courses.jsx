import React, { useEffect, useMemo, useState } from 'react';
import { FiBookOpen, FiClock, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';
import CoursesModal from './CoursesModal';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const COURSES_API = `${API_BASE_URL}/users/courses`; // for GET and DELETE
const COURSE_API = `${API_BASE_URL}/users/course`;   // for POST and PUT (singular, adjust if needed)

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // null = add mode, object = edit mode
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState("");
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadCourses = async () => {
    try {
      setApiError('');
      const response = await fetch(COURSES_API, {
        headers: { ...getAuthHeaders() },
      });
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to load courses');
      }

      const parsedCourses = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      setCourses(parsedCourses);
    } catch (error) {
      setApiError(error.message);
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
        headers: { ...getAuthHeaders() },
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to delete course');
      }
         setSuccessMessage("Course deleted successfully ✅");
    
      await loadCourses();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsDeletingId(null);
    }
  };
useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [successMessage]);
  const handleAddClick = () => {
    setEditingCourse(null); // null means add mode
    setIsModalOpen(true);
  };

  const handleEditClick = (course) => {
    setEditingCourse(course); // set the course to edit
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

 const handleCourseSaved = (updatedCourse) => {
  if (editingCourse) {
    setCourses((prev) =>
      prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    setSuccessMessage("Course updated successfully ✅");
  } else {
    setCourses((prev) => [updatedCourse, ...prev]);
    setSuccessMessage("Course added successfully ✅");
  }
};

  const activeCount = useMemo(
    () =>
      courses.filter((course) => {
        const status = String(course?.status || '').toLowerCase();
        return !status || status === 'active';
      }).length,
    [courses]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Courses Management</h1>
            <p className="mt-1 text-sm text-slate-500">Create and manage all published course offerings.</p>
          </div>
          <button
            onClick={handleAddClick}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <FiPlus />
            Add New Course
          </button>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total Courses</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{isLoading ? '...' : courses.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Active Courses</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{isLoading ? '...' : activeCount}</p>
          </div>
        </div>
      </section>

      {/* API Error */}
      {apiError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {apiError}
        </p>
      )}
       {successMessage && (
  <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
    {successMessage}
  </p>
)}
      {/* Courses Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-100/90">
              <tr className="text-xs uppercase tracking-[0.12em] text-slate-500">
                <th className="px-5 py-3.5 font-semibold">Course</th>
                <th className="px-5 py-3.5 font-semibold">Duration</th>
                <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                courses.map((course) => (
                  <tr key={course.id} className="border-t border-slate-100">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-cyan-100 p-2 text-cyan-700">
                          <FiBookOpen />
                        </span>
                        <p className="font-semibold text-slate-800">{course.title || course.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-medium">
                        <FiClock className="text-slate-500" />
                        {course.duration || 'N/A'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          className="inline-flex items-center justify-center rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-semibold text-amber-600 transition hover:bg-amber-50"
                          title="Edit"
                          onClick={() => handleEditClick(course)}
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          className="inline-flex items-center justify-center rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete"
                          disabled={isDeletingId === course.id}
                          onClick={() => handleDelete(course.id)}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!isLoading && courses.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-5 py-10 text-center text-sm text-slate-500">
                    No courses found.
                  </td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td colSpan="3" className="px-5 py-10 text-center text-sm text-slate-500">
                    Loading courses...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      <CoursesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCourseSaved={handleCourseSaved}
        editingCourse={editingCourse}
      />
    </div>
  );
};

export default Courses;