      import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const recentEnquiries = [
    { id: 1, name: 'John Doe', course: 'UI/UX Design', date: '2023-08-15' },
    { id: 2, name: 'Jane Smith', course: 'Graphic Design', date: '2023-08-16' },
    { id: 3, name: 'Bob Johnson', course: 'Video Editing', date: '2023-08-17' },
    { id: 4, name: 'Alice Williams', course: 'Digital Marketing', date: '2023-08-18' },    
  ];

  return (
    <div className="p-8">   
      {/* Recent Enquiries */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Course</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{enq.name}</td>
                  <td className="py-2 px-4">{enq.course}</td>
                  <td className="py-2 px-4">{enq.date}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Link to={`/admin/enquiries/${enq.id}`} className="text-gray-600 hover:text-[#FF6B6B]">
                      <button className="text-gray-600 hover:text-[#FF6B6B] mr-2">👁️</button>
                    </Link>
                    <Link to={`/admin/enquiries/reply/${enq.id}`} className="text-gray-600 hover:text-[#FF6B6B]">
                      <button className="text-gray-600 hover:text-[#FF6B6B]">✏️</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/admin/enquiries" className="inline-block mt-4 text-[#FF6B6B] hover:underline">
          View All →
        </Link>
      </div> */}
    </div>
  );
};

export default Dashboard;
