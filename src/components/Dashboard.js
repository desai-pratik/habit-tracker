import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import HabitCard from './HabitCard';

const Dashboard = () => {
  const { habits } = useContext(HabitContext);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-semibold mb-4">Your Habits</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.length > 0 ? (
          habits.map(habit => <HabitCard key={habit.id} habit={habit} />)
        ) : (
          <p className="text-gray-500 text-lg">No habits found!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
