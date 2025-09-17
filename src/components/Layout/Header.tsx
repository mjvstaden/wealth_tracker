import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
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
          <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-light-gray transition-colors duration-200">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-deep-navy">John Doe</p>
              <p className="text-xs text-medium-gray">Premium Account</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
