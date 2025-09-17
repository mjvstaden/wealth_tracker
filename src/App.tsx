import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Scenarios from './pages/Scenarios';
import Settings from './pages/Settings';

function App() {
  // This will be replaced with actual auth logic later
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
