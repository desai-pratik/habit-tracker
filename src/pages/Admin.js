import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto ">
        <h1 className="text-4xl font-semibold text-center mb-8 text-blue-600">Admin Dashboard</h1>
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
