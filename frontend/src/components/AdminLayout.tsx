import React from 'react';
import { Outlet } from 'react-router';
import { AdminNavbar } from './AdminNavbar';

const AdminLayout: React.FC = () => {
  return (
    <div className="pt-28 min-h-screen custom-bg-image selection:bg-[#FF4461] selection:text-white">
      <AdminNavbar />
      
      {/* Admin Page Content renders here */}
      <main className="max-w-6xl mx-auto px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;