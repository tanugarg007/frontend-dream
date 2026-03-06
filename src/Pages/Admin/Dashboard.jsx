import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiLayers,
  FiMail,
  FiTrendingUp,
} from 'react-icons/fi';
import { serverUrl } from '../../url/url';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || serverUrl; // fallback to serverUrl from url.js if env var is not set

const formatRelative = (dateValue) => {
  if (!dateValue) return 'Recently';
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'Recently';

  const minutes = Math.max(1, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? 'day' : 'days'} ago`;
};

const formatDate = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
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
          const adminResponse = await fetch(`${API_BASE_URL}/users/enquiries`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }).catch(() => null);

          if (adminResponse?.ok) return adminResponse;
          return fetch(`${API_BASE_URL}/users/enquiries`);
        })();

        const [coursesResponse, enquiriesResponse] = await Promise.all([coursesPromise, enquiriesPromise]);

        const coursesBody = await coursesResponse.json().catch(() => []);
        const enquiriesBody = await enquiriesResponse.json().catch(() => []);

        setCourses(parseList(coursesBody));
        setEnquiries(parseList(enquiriesBody));
      } catch (error) {
        setCourses([]);
        setEnquiries([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const sortedCourses = useMemo(
    () =>
      courses
        .slice()
        .sort((a, b) => {
          const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
          const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
          return bTime - aTime;
        }),
    [courses]
  );

  const sortedEnquiries = useMemo(
    () =>
      enquiries
        .slice()
        .sort((a, b) => {
          const aTime = new Date(a?.createdAt || a?.date || 0).getTime();
          const bTime = new Date(b?.createdAt || b?.date || 0).getTime();
          return bTime - aTime;
        }),
    [enquiries]
  );

  const recentEnquiriesToday = useMemo(() => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return enquiries.filter((item) => {
      const date = new Date(item?.createdAt || item?.date || 0).getTime();
      return date && date >= startOfDay;
    }).length;
  }, [enquiries]);

  const activeCoursesCount = useMemo(
    () =>
      courses.filter((course) => {
        const status = String(course?.status || '').toLowerCase();
        return !status || status === 'active';
      }).length,
    [courses]
  );

  const categoryBreakdown = useMemo(() => {
    const grouped = courses.reduce((acc, item) => {
      const category = getCategory(item);
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [courses]);

  const stats = [
    {
      title: 'Total Enquiries',
      value: isLoading ? '...' : String(enquiries.length),
      note: isLoading ? 'Loading data' : `${recentEnquiriesToday} received today`,
      icon: FiMail,
      tone: 'bg-cyan-50 text-cyan-700',
      iconTone: 'bg-cyan-600',
    },
    {
      title: 'Total Courses',
      value: isLoading ? '...' : String(courses.length),
      note: isLoading ? 'Loading data' : `${activeCoursesCount} active`,
      icon: FiBookOpen,
      tone: 'bg-amber-50 text-amber-700',
      iconTone: 'bg-amber-600',
    },
    {
      title: 'Latest Course Update',
      value: isLoading ? '...' : sortedCourses[0]?.title || sortedCourses[0]?.name || 'N/A',
      note: isLoading ? 'Loading data' : formatRelative(sortedCourses[0]?.updatedAt || sortedCourses[0]?.createdAt),
      icon: FiTrendingUp,
      tone: 'bg-indigo-50 text-indigo-700',
      iconTone: 'bg-indigo-600',
    },
    {
      title: 'Today',
      value: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
      note: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' }),
      icon: FiCalendar,
      tone: 'bg-emerald-50 text-emerald-700',
      iconTone: 'bg-emerald-600',
    },
  ];

  return (
    <div className="relative space-y-6">
      <div className="pointer-events-none absolute inset-x-0 -top-8 -z-10 h-72 bg-gradient-to-b from-cyan-100 via-sky-50 to-transparent" />

      <section className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 p-6 text-white shadow-[0_18px_45px_rgba(2,6,23,0.35)] sm:p-8">
        <div className="absolute -right-20 top-8 h-52 w-52 rounded-full bg-cyan-400/25 blur-3xl" />
        <div className="absolute -left-12 bottom-2 h-44 w-44 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_30%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
              <FiClock />
              Operations Overview
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Admin Dashboard</h1>
            <p className="mt-2 max-w-xl text-sm text-slate-200 sm:text-base">
              Track enquiries, courses, and recent updates from a single control center.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-cyan-100"
            >
              Open Enquiries
              <FiArrowRight />
            </Link>
            <Link
              to="/admin/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20"
            >
              Manage Courses
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="group rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-500">{item.title}</p>
                  <p className="mt-2 truncate text-2xl font-bold text-slate-900 sm:text-3xl">{item.value}</p>
                </div>
                <div className={`rounded-xl p-2.5 text-white shadow-sm ${item.iconTone}`}>
                  <Icon className="text-lg" />
                </div>
              </div>
              <p className={`mt-4 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${item.tone}`}>
                {item.note}
              </p>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-1.5 w-2/3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600" />
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-7 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Recent Course Updates</h2>
            <Link to="/admin/courses" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
              View All
            </Link>
          </div>

          {sortedCourses.length === 0 ? (
            <p className="text-sm text-slate-500">No courses found yet.</p>
          ) : (
            <div className="space-y-3">
              {sortedCourses.slice(0, 2).map((course, index) => (
                <div
                  key={course?.id || index}
                  className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-cyan-50/40 px-4 py-3 transition hover:border-cyan-200 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{course?.title || course?.name || 'Untitled Course'}</p>
                    <p className="text-sm text-slate-500">{getCategory(course)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-500">
                      {formatRelative(course?.updatedAt || course?.createdAt)}
                    </span>
                    <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-xs font-semibold text-cyan-700">
                      {course?.status || 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="xl:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Latest Enquiries</h2>
            <Link to="/admin/enquiries" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
              View All
            </Link>
          </div>

          {sortedEnquiries.length === 0 ? (
            <p className="text-sm text-slate-500">No enquiries available.</p>
          ) : (
            <div className="space-y-3">
              {sortedEnquiries.slice(0, 2).map((enquiry, index) => (
                <div
                  key={enquiry?.id || index}
                  className="rounded-xl border border-slate-100 bg-gradient-to-r from-white to-slate-50 p-4 transition hover:border-cyan-200"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">{enquiry?.name || 'Unknown User'}</p>
                      <p className="text-xs text-slate-500">{enquiry?.email || 'No email provided'}</p>
                    </div>
                    <span className="rounded-full bg-slate-200/80 px-2 py-1 text-[11px] font-semibold text-slate-700">
                      {formatDate(enquiry?.createdAt || enquiry?.date)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    Course: <span className="font-medium text-slate-800">{enquiry?.course || 'General'}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              to="/admin/courses"
              className="group rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50"
            >
              <p className="text-sm font-semibold text-slate-800">Add or Edit Courses</p>
              <p className="mt-1 text-xs text-slate-500">Update catalog, duration and descriptions.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700">
                Open
                <FiArrowRight className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/admin/enquiries"
              className="group rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50"
            >
              <p className="text-sm font-semibold text-slate-800">Review Enquiries</p>
              <p className="mt-1 text-xs text-slate-500">Check latest student leads and responses.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700">
                Open
                <FiArrowRight className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/admin/settings"
              className="group rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 sm:col-span-2"
            >
              <p className="text-sm font-semibold text-slate-800">Update Admin Settings</p>
              <p className="mt-1 text-xs text-slate-500">Manage profile details, credentials and preferences.</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700">
                Open
                <FiArrowRight className="transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-600 p-2 text-white">
              <FiLayers />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Course Categories</h2>
          </div>
          {categoryBreakdown.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">Categories will appear once courses are added.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {categoryBreakdown.map(([name, count]) => (
                <div key={name} className="rounded-xl border border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/30 p-3">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{name}</span>
                    <span className="font-semibold text-slate-900">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-indigo-600"
                      style={{ width: `${Math.min(100, Math.round((count / Math.max(courses.length, 1)) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
