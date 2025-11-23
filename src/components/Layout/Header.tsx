import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-bg-primary border-b border-border-default px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button */}
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-bg-secondary transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-text-primary" />
        </button>

        {/* Right side - Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto">
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
