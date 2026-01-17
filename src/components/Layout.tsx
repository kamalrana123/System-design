import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import ReadingProgress from './ReadingProgress';
import '../App.css';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <ReadingProgress />
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="main-container">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        {isSidebarOpen && (
          <div 
            className="mobile-sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <main className="content-area">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}