import React, { useContext, useEffect, useState } from 'react';
import { HabitContext } from '../context/HabitContext';

const NotificationPanel = () => {
  const { habits } = useContext(HabitContext);
  const [notifications, setNotifications] = useState([]);
  const { markHabitComplete } = useContext(HabitContext);

  useEffect(() => {
    const now = new Date();
    const upcomingHabits = habits.filter(habit => {
      const habitDate = new Date(habit.startDate);
      return habitDate >= now && !habit.completed;
    });
    setNotifications(upcomingHabits);
  }, [habits]);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow border rounded-md p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Notifications</h2>

        {notifications.length > 0 ? (
          <ul className="space-y-4">
            {notifications.map((habit) => (
              <li key={habit.id} className="mb-4">
                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-md shadow-sm flex flex-col md:flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-lg font-bold text-gray-900">{habit.name}</p>
                    <p className="text-gray-700">Starting on: <span className="font-medium">{habit.startDate}</span></p>
                    <p className="text-gray-700">Goal: <span className="font-medium">{habit.goal}</span></p>
                    <p className="text-gray-700">Frequency: <span className="font-medium capitalize">{habit.frequency}</span></p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none" onClick={() => markHabitComplete(habit.id)}>Mark as Complete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No upcoming habits for today.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
