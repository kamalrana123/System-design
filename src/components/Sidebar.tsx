import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Search from './Search';
import { routes } from '../utils/routeHelpers';
import type { RouteItem, RouteCategory } from '../utils/routeHelpers';
import '../App.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavGroup = ({ 
  item, 
  level, 
  onClose 
}: { 
  item: RouteItem | RouteCategory, 
  level: number, 
  onClose: () => void 
}) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand if child is active
  useEffect(() => {
    if ('children' in item) {
      const hasActiveChild = (children: (RouteItem | RouteCategory)[]): boolean => {
        return children.some(child => {
          if ('path' in child) return child.path === location.pathname;
          return hasActiveChild(child.children);
        });
      };
      if (hasActiveChild(item.children)) {
        setIsExpanded(true);
      }
    }
  }, [location.pathname, item]);

  if ('path' in item) {
    return (
      <NavLink
        to={item.path}
        end
        onClick={onClose}
        className={({ isActive }) => `nav-item level-${level} ${isActive ? 'active' : ''}`}
      >
        {item.title}
      </NavLink>
    );
  }

  return (
    <div className={`nav-section level-${level}`}>
      <button 
        className={`nav-title-btn ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="nav-title">{item.category}</span>
        <svg 
          className="chevron" 
          width="14" 
          height="14" 
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
          {item.children.map((child, idx) => (
            <NavGroup 
              key={idx} 
              item={child} 
              level={level + 1} 
              onClose={onClose} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Search />
      <nav className="nav-menu">
        {routes.map((route, index) => (
          <NavGroup 
            key={index} 
            item={route} 
            level={0} 
            onClose={onClose} 
          />
        ))}
      </nav>
    </aside>
  );
}