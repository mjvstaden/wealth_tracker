import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 text-[#1a2332] animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f5f6f8]">
        <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a2332] mb-2">
              Sign In Required
            </h2>
            <p className="text-[#8a95a3]">
              Please sign in to access your portfolio and financial modeling tools.
            </p>
          </div>
          <button
            onClick={() => loginWithRedirect()}
            className="w-full bg-[#1a2332] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#2c3340] transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
