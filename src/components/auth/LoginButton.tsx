import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={() => loginWithRedirect()}
      className="bg-[#1a2332] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#2c3340] transition-colors"
    >
      Sign In to Your Portfolio
    </button>
  );
};

export default LoginButton;
