import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { RiCheckFill } from 'react-icons/ri';

const HabitCard = ({ habit }) => {
  const { markHabitComplete, deleteHabit } = useContext(HabitContext);
  const navigate = useNavigate();

  return (
    <div className="border border-gray-200 rounded p-4 bg-white shadow transition-transform transform hover:scale-105">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold ">{habit.name}</h3>
        <div className="flex items-center rounded-lg overflow-none">
          <button
            className="p-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={() => navigate(`/edit-habit/${habit.id}`)}
          >
            <FaEdit size={20} />
          </button>
          <button
            className="p-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => deleteHabit(habit.id)}
          >
            <FaTrash size={20} />
          </button>
        </div>

      </div>
      <p className="text-gray-700">Goal: <strong>{habit.goal}</strong></p>
      <p className="text-gray-700">Streak: <strong>{habit.streak}</strong></p>
      <p className="text-gray-700">Start Date: <strong>{habit.startDate}</strong></p>
      <p className="text-gray-700">Frequency: <strong>{habit.frequency}</strong></p>

      <div className="mt-4">
        {!habit.completed ? (
          <button
            className="mt-2 p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex"
            onClick={() => markHabitComplete(habit.id)}
          >
            <RiCheckFill size={20} />
            Mark as Complete
          </button>
        ) : (
          <p className="text-green-500 mt-2">Completed!</p>
        )}
      </div>
    </div>
  );
};

export default HabitCard;
