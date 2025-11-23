import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BuyVsRent from './pages/BuyVsRent';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - No authentication required for MVP */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buy-vs-rent" element={<BuyVsRent />} />

          {/* Placeholder routes for future MVP pages */}
          <Route path="scenario-setup" element={<div className="p-6 text-text-primary">Scenario Setup Page - Coming Soon</div>} />
          <Route path="results" element={<div className="p-6 text-text-primary">Results Page - Coming Soon</div>} />
          <Route path="saved" element={<div className="p-6 text-text-primary">Saved Scenarios Page - Coming Soon</div>} />
          <Route path="about" element={<div className="p-6 text-text-primary">About Page - Coming Soon</div>} />

          {/* Catch-all redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
