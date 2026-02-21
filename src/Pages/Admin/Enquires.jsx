import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const Enquires = () => {
  const [enquiries, setEnquiries] = useState([]);
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken') || localStorage.getItem('token') || '';
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getEnquiries = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/enquiries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });

      const data = await response.json();
      setEnquiries(Array.isArray(data?.enquiries) ? data.enquiries : []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setEnquiries([]);
    }
  };

  useEffect(() => {
    getEnquiries();
  }, []);

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure?")) return;

  const res = await fetch(`${API_BASE_URL}/users/enquiries/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (res.ok) {
    // DB se delete hone ke baad fresh data lao
    getEnquiries();
  } else {
    alert("Delete failed");
  }
};

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Enquiries Management</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{enq.name}</td>
                <td className="py-3 px-4">{enq.email}</td>
                <td className="py-3 px-4">{enq.phone}</td>
                <td className="py-3 px-4">{enq.course}</td>
                <td className="py-3 px-4">{new Date(enq.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    className="text-gray-600 hover:text-red-600 ml-5"
                    title="Delete"
                    onClick={() => handleDelete(enq.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquires;
