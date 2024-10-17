import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';

const AdminDashboard = () => {
  const { habits } = useContext(HabitContext);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Users' Habits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div key={habit.id} className="border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold text-blue-500">{habit.name}</h3>
              <p className="text-gray-700"><strong>Goal:</strong> {habit.goal}</p>
              <p className="text-gray-700"><strong>Streak:</strong> {habit.streak}</p>
              <p className="text-gray-700"><strong>Created By:</strong> {habit.createdBy}</p>
              <p className="text-gray-700"><strong>Frequency:</strong> {habit.frequency}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No habits available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
