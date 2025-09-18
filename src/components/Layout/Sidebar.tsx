import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  TrendingUp, 
  Settings,
  ChevronLeft,
  DollarSign,
  BarChart3,
  Calculator
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/portfolio', name: 'Portfolio', icon: PieChart },
    { path: '/scenarios', name: 'Scenarios', icon: TrendingUp },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white shadow-sidebar z-20 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <div className="animate-fade-in">
              <div>
                <h1 className="text-xl font-bold text-deep-navy">True North</h1>
                <p className="text-sm font-medium text-medium-gray">Wealth Analytics</p>
              </div>
              {/* <p className="text-xs text-medium-gray mt-1">Model. Analyze. Optimize.</p> */}
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-light-gray transition-colors duration-200"
        >
          <ChevronLeft
            className={`w-5 h-5 text-medium-gray transition-transform duration-300 ${
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
                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-light-gray animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-forest-green" />
                <span className="text-sm text-dark-gray">Portfolio Value</span>
              </div>
              <span className="text-sm font-semibold text-deep-navy">$125,430</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-emerald-brand" />
                <span className="text-sm text-dark-gray">Active Scenarios</span>
              </div>
              <span className="text-sm font-semibold text-deep-navy">3</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
