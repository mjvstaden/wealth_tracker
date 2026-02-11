import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoMark } from '../shared/Logo';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/buy-vs-rent', label: 'Buy vs Rent' },
  ];

  return (
    <header className="border-b border-border-subtle bg-bg-primary sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-accent-primary rounded-lg flex items-center justify-center transition-shadow group-hover:shadow-glow-blue">
              <LogoMark className="w-4 h-4 text-bg-primary" />
            </div>
            <span className="font-display text-base font-bold text-text-primary tracking-tight">
              True North
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-tertiary hover:text-text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-md text-text-secondary hover:text-text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="sm:hidden pb-4 pt-2 animate-fade-in-up" style={{ animationDuration: '0.2s' }}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent-primary bg-accent-primary/10'
                        : 'text-text-secondary hover:text-text-primary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
