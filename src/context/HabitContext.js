import React, { createContext, useState, useEffect } from 'react';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits'));
    if (storedHabits) {
      setHabits(storedHabits);
    }
  }, []);

  const addHabit = (habit) => {
    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const markHabitComplete = (habitId) => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const lastCompletionDate = habit.lastCompletedDate;
        let updatedStreak = habit.streak;

        if (lastCompletionDate) {
          const lastDate = new Date(lastCompletionDate);
          lastDate.setDate(lastDate.getDate() + 1);

          if (lastDate.toISOString().split('T')[0] === today) {
            updatedStreak++;
          } else if (lastCompletionDate !== today) {
            updatedStreak = 1;
          }
        } else {
          updatedStreak = 1;
        }

        return { ...habit, completed: true, lastCompletedDate: today, streak: updatedStreak };
      }
      return habit;
    });
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };


  const updateHabit = (updatedHabit) => {
    const updatedHabits = habits.map(habit =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const deleteHabit = (habitId) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, markHabitComplete, updateHabit, deleteHabit }}>
      {children}
    </HabitContext.Provider>
  );
};
