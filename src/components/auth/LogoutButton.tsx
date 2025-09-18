import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
  showIcon?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ className = '', showIcon = true }) => {
  const { logout, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button 
      onClick={() => logout({ 
        logoutParams: { returnTo: window.location.origin } 
      })}
      className={`w-full text-left px-4 py-2 text-sm text-dark-gray hover:bg-light-gray flex items-center space-x-2 ${className}`}
    >
      {showIcon && <LogOut className="w-4 h-4" />}
      <span>Sign Out</span>
    </button>
  );
};

export default LogoutButton;
