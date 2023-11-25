import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatientDetail from './components/PatientDetail';
import './components/styles/App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');  // State to store the username

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
                  <button onClick={handleLogout}>Logout</button> {/* Added Logout button */}
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="container">

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLoginSuccess={(user) => { setIsAuthenticated(true); setUsername(user); }} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard username={username} /> : <Navigate to="/login" />} />
            <Route path="/" element={<Home />} />
            <Route path="/patient/:id" element={<PatientDetail />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
