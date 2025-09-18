import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiWithAuth } from './hooks/useApiWithAuth';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Scenarios from './pages/Scenarios';
import Settings from './pages/Settings';
import { ProtectedRoute, AuthError } from './components/auth';
import AuthDebug from './components/auth/AuthDebug';
import { Loader2 } from 'lucide-react';

// Callback component to handle Auth0 redirect
const AuthCallback: React.FC = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f6f8]">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f6f8]">
        <Loader2 className="h-8 w-8 text-[#1a2332] animate-spin mb-4" />
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  
  // Setup API client with authentication
  useApiWithAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f5f6f8]">
        <Loader2 className="h-8 w-8 text-[#1a2332] animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <AuthError />
      <AuthDebug />
      <Routes>
        {/* Auth Callback Route */}
        <Route path="/callback" element={<AuthCallback />} />
        
        {/* Public Route */}
        <Route 
          path="/" 
          element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} 
        />
        
        {/* Protected Routes */}
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
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
