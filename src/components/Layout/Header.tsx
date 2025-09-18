import React, { useState } from 'react';
import { Menu, Bell, Search, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { UserProfile, LogoutButton } from '../auth';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, isAuthenticated } = useAuth0();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button and Search */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-light-gray transition-colors duration-200 lg:hidden"
          >
            <Menu className="w-5 h-5 text-dark-gray" />
          </button>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-medium-gray" />
            <input
              type="text"
              placeholder="Search portfolios, scenarios..."
              className="pl-10 pr-4 py-2 bg-light-gray rounded-lg text-sm w-64 
                       focus:outline-none focus:ring-1 focus:ring-steel-blue focus:bg-white
                       transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Market Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-light-gray rounded-lg">
            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
            <span className="text-sm text-dark-gray">Markets Open</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-light-gray transition-colors duration-200">
            <Bell className="w-5 h-5 text-dark-gray" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error-red rounded-full"></span>
          </button>

          {/* Profile Dropdown */}
          {isAuthenticated && user && (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-light-gray transition-colors duration-200"
              >
                {user.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name || 'User'}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium text-deep-navy">{user.name || user.email}</p>
                  <p className="text-xs text-medium-gray">
                    {user.email}
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-deep-navy">{user.name || 'User'}</p>
                    <p className="text-xs text-medium-gray">{user.email}</p>
                  </div>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-dark-gray hover:bg-light-gray flex items-center space-x-2">
                    <UserIcon className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  
                  <button className="w-full text-left px-4 py-2 text-sm text-dark-gray hover:bg-light-gray flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <LogoutButton />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
