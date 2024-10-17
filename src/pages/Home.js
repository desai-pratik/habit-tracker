import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {

  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className='text-center'>
        <h1 className="text-4xl mb-6">Welcome to Habit Tracker</h1>
        {!user && (
          <>
            <Link to="/login" className="mr-4 p-2 bg-blue-500 text-white">Login</Link>
            <Link to="/signup" className="p-2 bg-green-500 text-white">Signup</Link>
          </>
        )}
        {user?.role === "user" &&  <Link to="/user" className="p-2 bg-green-500 text-white">User dashboard</Link>}
        {user?.role === "admin" &&  <Link to="/admin" className="p-2 bg-green-500 text-white">Admin dashboard</Link>}
      </div>
    </div>
  );
};

export default Home;
