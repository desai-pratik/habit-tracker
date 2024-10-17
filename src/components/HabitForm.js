import React, { useState, useContext, useEffect } from 'react';
import { HabitContext } from '../context/HabitContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const HabitForm = () => {
  const { addHabit, updateHabit, habits } = useContext(HabitContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const habitToEdit = habits.find(habit => habit.id === parseInt(id));
      if (habitToEdit) {
        setName(habitToEdit.name);
        setGoal(habitToEdit.goal);
        setStartDate(habitToEdit.startDate);
        setFrequency(habitToEdit.frequency);
      }
    }
  }, [id, habits]);

  const validate = () => {
    const validationErrors = {};
    if (!name.trim()) {
      validationErrors.name = 'Habit name is required.';
    } else if (name.trim().length < 3) {
      validationErrors.name = 'Habit name must be at least 3 characters long.';
    }

    if (!goal.trim()) {
      validationErrors.goal = 'Goal is required.';
    } else if (goal.trim().length < 4) {
      validationErrors.goal = 'Goal must be at least 4 characters long.';
    }

    if (!startDate) {
      validationErrors.startDate = 'Start date is required.';
    } else {
      const today = new Date().toISOString().split('T')[0];
      if (new Date(startDate) < new Date(today)) {
        validationErrors.startDate = 'Start date must be today or in the future.';
      }
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newHabit = {
      id: id ? parseInt(id) : Date.now(),
      name,
      goal,
      startDate,
      frequency,
      streak: 0,
      completed: false,
      createdBy: user.username
    };
    if (id) {
      updateHabit(newHabit);
    } else {
      addHabit(newHabit);
    }

    setName('');
    setGoal('');
    setStartDate('');
    setFrequency('daily');
    setErrors({});
    navigate("/user");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 border rounded-lg shadow bg-white">
      <h2 className="text-3xl font-semibold text-center mb-6">{id ? 'Edit Habit' : 'Add New Habit'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Habit Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter habit name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className={`mt-1 p-3 border ${errors.goal ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your goal"
          />
          {errors.goal && <p className="text-red-500 text-sm">{errors.goal}</p>}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`mt-1 p-3 border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Frequency</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <button type="submit" className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
          {id ? 'Update Habit' : 'Add Habit'}
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
