import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { HabitContext } from '../context/HabitContext';
import { IoNotifications } from 'react-icons/io5';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const { habits } = useContext(HabitContext);

  useEffect(() => {
    const now = new Date();
    const upcomingHabits = habits.filter(habit => {
      const habitDate = new Date(habit.startDate);
      return habitDate >= now && !habit.completed;
    });
    setNotifications(upcomingHabits);
  }, [habits]);

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold">
          Habit Tracker
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:block">Hello, <strong>{user.username}</strong></span>

              {user.role === 'user' && (
                <Link to="/add-habit" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition">
                  Add Habit
                </Link>
              )}

              {user.role === 'user' && (
                <Link to="/notification" className="relative text-2xl">
                  <IoNotifications className="hover:text-gray-400 transition" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 text-xs bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
