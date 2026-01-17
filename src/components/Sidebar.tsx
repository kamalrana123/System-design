import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Search from './Search';
import { routes } from '../utils/routeHelpers';
import '../App.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  // Auto-expand section if it contains the active route
  useEffect(() => {
    // Accordion behavior: only expand the section containing the active route
    const newExpanded: Record<string, boolean> = {};
    routes.forEach((section) => {
      const hasActiveChild = section.items.some(item => item.path === location.pathname);
      if (hasActiveChild) {
        newExpanded[section.category] = true;
      }
    });
    
    // Only update if we found an active child, otherwise keep current expansion
    if (Object.keys(newExpanded).length > 0) {
      setExpandedSections(newExpanded);
    }
  }, [location.pathname]);

  const toggleSection = (category: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Search />
      <nav className="nav-menu">
        {routes.map((section, index) => {
          const isExpanded = !!expandedSections[section.category];
          
          return (
            <div key={index} className="nav-section">
              <button 
                className={`nav-title-btn ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleSection(section.category)}
              >
                <span className="nav-title">{section.category}</span>
                <svg 
                  className="chevron" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className={`nav-items-container ${isExpanded ? 'show' : ''}`}>
                <div>
                  {section.items.map((route) => (
                    <NavLink
                      key={route.path}
                      to={route.path}
                      end
                      onClick={onClose}
                      className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                      {route.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}