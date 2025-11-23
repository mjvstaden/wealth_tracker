import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  TrendingUp,
  Bookmark,
  Info,
  ChevronLeft,
  BarChart3,
  Calculator
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navItems = [
    { path: '/', name: 'Home', icon: Home },
    { path: '/scenarios', name: 'Scenarios', icon: TrendingUp },
    { path: '/saved', name: 'Saved', icon: Bookmark },
    { path: '/about', name: 'About', icon: Info },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-bg-primary border-r border-border-default z-20 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border-default">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-bg-primary" />
          </div>
          {isOpen && (
            <div className="animate-fade-in">
              <h1 className="text-lg font-bold gradient-logo">True North</h1>
              <p className="text-xs text-text-tertiary">Wealth Analytics</p>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-bg-secondary transition-colors duration-200"
        >
          <ChevronLeft
            className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${
              !isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-primary text-bg-primary'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-accent-primary'
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && (
                <span className="animate-fade-in">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Quick Stats (visible when sidebar is open) */}
      {isOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-default bg-bg-secondary animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-text-secondary">Portfolio Value</span>
              </div>
              <span className="text-sm font-semibold font-mono text-text-primary">$125,430</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-text-secondary">Active Scenarios</span>
              </div>
              <span className="text-sm font-semibold font-mono text-text-primary">3</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
