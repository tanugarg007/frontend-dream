import React, { useEffect, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Enquires = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [apiError, setApiError] = useState('');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getEnquiries = async () => {
    try {
      setApiError('');
      const response = await fetch(`${API_BASE_URL}/users/enquiries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to fetch enquiries');
      }

      setEnquiries(Array.isArray(data?.enquiries) ? data.enquiries : []);
    } catch (error) {
      setApiError(error.message || 'Error fetching enquiries');
      setEnquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      setApiError('');
      setIsDeletingId(id);
      const res = await fetch(`${API_BASE_URL}/users/enquiries/${id}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
        },
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body?.error || body?.message || 'Delete failed');
      }

      await getEnquiries();
    } catch (error) {
      setApiError(error.message || 'Delete failed');
    } finally {
      setIsDeletingId(null);
    }
  };

  const todayCount = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return enquiries.filter((item) => {
      const time = new Date(item?.createdAt || 0).getTime();
      return time && time >= start;
    }).length;
  }, [enquiries]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200/80 bg-white/95 p-5 shadow-sm sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Enquiries Management</h1>
        <p className="mt-1 text-sm text-slate-500">Review and manage incoming student enquiries.</p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total Enquiries</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{isLoading ? '...' : enquiries.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Received Today</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{isLoading ? '...' : todayCount}</p>
          </div>
        </div>
      </section>

      {apiError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {apiError}
        </p>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-100/90">
              <tr className="text-xs uppercase tracking-[0.12em] text-slate-500">
                <th className="px-5 py-3.5 font-semibold">Name</th>
                <th className="px-5 py-3.5 font-semibold">Email</th>
                <th className="px-5 py-3.5 font-semibold">Phone</th>
                <th className="px-5 py-3.5 font-semibold">Course</th>
                <th className="px-5 py-3.5 font-semibold">Date</th>
                <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                enquiries.map((enq) => (
                  <tr key={enq.id} className="border-t border-slate-100">
                    <td className="px-5 py-4 font-medium text-slate-800">{enq.name || 'N/A'}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{enq.email || 'N/A'}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{enq.phone || 'N/A'}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">{enq.course || 'General'}</td>
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Delete"
                        onClick={() => handleDelete(enq.id)}
                        disabled={isDeletingId === enq.id}
                      >
                        <FiTrash2 className="text-sm" />
                        {/* <span className="text-sm">{isDeletingId === enq.id ? '...' : '🗑️'}</span> */}
                      </button>
                    </td>
                  </tr>
                ))}

              {!isLoading && enquiries.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-5 py-10 text-center text-sm text-slate-500">
                    No enquiries found.
                  </td>
                </tr>
              )}

              {isLoading && (
                <tr>
                  <td colSpan="6" className="px-5 py-10 text-center text-sm text-slate-500">
                    Loading enquiries...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Enquires;
