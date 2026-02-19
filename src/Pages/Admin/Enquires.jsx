import React, { useState } from 'react';

const Enquires = () => {
  const [enquiries, setEnquiries] = useState([
    // { id: 1, name: 'Riya Sharma', email: 'riya@example.com', phone: '98765****', course: 'Manga Drawing', date: '2024-02-10', status: 'New' },
    // { id: 2, name: 'Arjun Kumar', email: 'arjun@example.com', phone: '87654****', course: 'Digital Art', date: '2024-02-10', status: 'Pending' },
    // { id: 3, name: 'Priya Singh', email: 'priya@example.com', phone: '76543****', course: 'Character Design', date: '2024-02-09', status: 'Done' },
    // { id: 4, name: 'Rahul Verma', email: 'rahul@example.com', phone: '65432****', course: 'Animation Basics', date: '2024-02-08', status: 'New' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status: newStatus } : e)));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(enquiries.filter((e) => e.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-dark mb-6">Enquiries Management</h1>

      {/* Filter */}
      <div className="mb-6">
        {/* <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All Status' : s}
            </option>
          ))}
        </select> */}
      </div>

      {/* Enquiries Table */}
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
                <td className="py-3 px-4">{enq.date}</td>
                <td className="py-3 px-4">
                  <button className="text-gray-600 hover:text-primary mr-2" title="Reply" onclick>📨</button>
                  <button className="text-gray-600 hover:text-red-600" title="Delete" onClick={() => handleDelete(enq.id)}>🗑️</button>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">No enquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquires;
