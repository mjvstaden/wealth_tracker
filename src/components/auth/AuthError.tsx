import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AlertCircle } from 'lucide-react';

const AuthError: React.FC = () => {
  const { error, loginWithRedirect } = useAuth0();

  if (!error) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Authentication Error
          </h3>
          <p className="text-red-700 mb-4">{error.message}</p>
          <button
            onClick={() => loginWithRedirect()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthError;
