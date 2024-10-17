import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HabitProvider } from './context/HabitContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './pages/User';
import Admin from './pages/Admin';
import NotificationPanel from './components/NotificationPanel';
import HabitForm from './components/HabitForm';

const App = () => {
  return (
    <AuthProvider>
      <HabitProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element={<User />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/notification" element={<NotificationPanel />} />
            <Route path="/add-habit" element={<HabitForm />} />
            <Route path="/edit-habit/:id" element={<HabitForm />} />
          </Routes>
        </Router>
      </HabitProvider>
    </AuthProvider>
  );
};

export default App;
