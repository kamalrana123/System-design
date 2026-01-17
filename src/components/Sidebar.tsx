import { NavLink } from 'react-router-dom';
import Search from './Search';
import { routes } from '../utils/routeHelpers';
import '../App.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Search />
      <nav className="nav-menu">
        {routes.map((section, index) => (
          <div key={index} className="nav-section">
            <h3 className="nav-title">{section.category}</h3>
            {section.items.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                onClick={onClose}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {route.title}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}