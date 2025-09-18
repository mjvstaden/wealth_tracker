import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-8 bg-[#f5f6f8] rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      {user.picture && (
        <img 
          src={user.picture} 
          alt={user.name || 'User'}
          className="h-8 w-8 rounded-full object-cover"
        />
      )}
      <div className="hidden sm:block">
        <p className="text-sm font-medium text-[#1a2332]">{user.name || user.email}</p>
        <p className="text-xs text-[#8a95a3]">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
