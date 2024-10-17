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
import PrivateRoute from './context/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path="/user" element={<PrivateRoute><User /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            <Route path="/notification" element={<PrivateRoute><NotificationPanel /></PrivateRoute>} />
            <Route path="/add-habit" element={<PrivateRoute><HabitForm /></PrivateRoute>} />
            <Route path="/edit-habit/:id" element={<PrivateRoute><HabitForm /></PrivateRoute>} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Router>
      </HabitProvider>
    </AuthProvider>
  );
};

export default App;
