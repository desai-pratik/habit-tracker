import React from 'react';
import Dashboard from '../components/Dashboard';

const User = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center mb-6">Welcome to Your Habit Tracker</h1>
        <Dashboard />
      </div>
    </div>
  );
};

export default User;
