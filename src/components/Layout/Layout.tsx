import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
