// Existing App.js code
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setIsAuthenticated(false);        // Set authentication state to false
    setUsername('');  // Reset username when logging out
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLoginSuccess={(user) => { setIsAuthenticated(true); setUsername(user); }} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard username={username} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
