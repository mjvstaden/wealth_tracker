import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-bg-primary border-b border-border-default px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-bg-secondary transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>

          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center transition-all group-hover:shadow-glow-blue">
              <TrendingUp className="w-5 h-5 text-bg-primary" />
            </div>
            <h1 className="text-xl font-bold gradient-logo">True North</h1>
          </Link>
        </div>

        {/* Right side - Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="nav-link"
          >
            Home
          </Link>
          <Link
            to="/saved"
            className="nav-link"
          >
            Saved
          </Link>
          <Link
            to="/about"
            className="nav-link"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
