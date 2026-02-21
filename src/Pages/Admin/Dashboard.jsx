import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen, FiClock, FiMail, FiTrendingUp } from 'react-icons/fi';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const formatRelative = (dateValue) => {
  if (!dateValue) return 'Recently';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'Recently';

  const minutes = Math.max(1, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day ago`;
};

const getCategory = (course) =>
  course?.category || course?.courseCategory || course?.domain || 'General';

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      const parseList = (body) => {
        if (Array.isArray(body)) return body;
        if (Array.isArray(body?.data)) return body.data;
        if (Array.isArray(body?.enquiries)) return body.enquiries;
        return [];
      };

      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';

        const coursesPromise = fetch(`${API_BASE_URL}/users/courses`);
        const enquiriesPromise = (async () => {
          const adminResponse = await fetch(`${API_BASE_URL}/admin/enquiries`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }).catch(() => null);

          if (adminResponse?.ok) return adminResponse;
          return fetch(`${API_BASE_URL}/users/enquiries`);
        })();

        const [coursesResponse, enquiriesResponse] = await Promise.all([coursesPromise, enquiriesPromise]);

        const coursesBody = await coursesResponse.json().catch(() => []);
        const enquiriesBody = await enquiriesResponse.json().catch(() => []);

        const parsedCourses = parseList(coursesBody);
        const parsedEnquiries = parseList(enquiriesBody);

        setCourses(parsedCourses);
        setEnquiries(parsedEnquiries);
      } catch (error) {
        setCourses([]);
        setEnquiries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);


  const recentEnquiriesToday = useMemo(() => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    return enquiries.filter((item) => {
      const date = new Date(item?.createdAt || item?.date || 0).getTime();
      return date && date >= startOfDay;
    }).length;
  }, [enquiries]);

  const recentCourses = useMemo(
    () =>
      courses
        .slice()
        .sort((a, b) => {
          const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
          const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
          return bTime - aTime;
        })
        .slice(0, 4)
        .map((course, index) => ({
          id: course?.id || index + 1,
          name: course?.title || course?.name || `Course ${index + 1}`,
          category: getCategory(course),
          time: formatRelative(course?.updatedAt || course?.createdAt),
          status: course?.status || 'Active',
        })),
    [courses]
  );

  const stats = [
    {
      title: 'Total Enquiries',
      value: isLoading ? '...' : String(enquiries.length),
      change: isLoading ? 'Loading' : `${recentEnquiriesToday} today`,
      icon: FiMail,
      tone: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Total Courses',
      value: isLoading ? '...' : String(courses.length),
      change: 'Live',
      icon: FiBookOpen,
      tone: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Latest Update',
      value: isLoading ? '...' : (recentCourses[0]?.time || 'N/A'),
      change: 'Course activity',
      icon: FiTrendingUp,
      tone: 'from-violet-500 to-indigo-600',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/30 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
              <FiClock />
              Live Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Admin Dashboard</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
              Courses and enquiry performance at one place with a clean control panel view.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-100"
          >
            Open Enquiries
            <FiArrowRight />
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{item.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
                </div>
                <div className={`rounded-xl bg-gradient-to-br p-2.5 text-white ${item.tone}`}>
                  <Icon className="text-lg" />
                </div>
              </div>
              <p className="mt-4 inline-flex rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                {item.change}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Recent Course Updates</h2>
            <Link to="/admin/courses" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
              View All
            </Link>
          </div>

          {recentCourses.length === 0 ? (
            <p className="text-sm text-slate-500">No courses found yet.</p>
          ) : (
            <div className="space-y-3">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{course.name}</p>
                    <p className="text-sm text-slate-500">{course.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">{course.time}</span>
                    <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                      {course.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <Link
              to="/admin/courses"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              Manage Courses
              <FiArrowRight />
            </Link>
            <Link
              to="/admin/enquiries"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              View Enquiries
              <FiArrowRight />
            </Link>
            <Link
              to="/admin/settings"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50"
            >
              Update Settings
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
