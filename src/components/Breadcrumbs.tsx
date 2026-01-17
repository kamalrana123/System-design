import { useLocation, Link } from 'react-router-dom';
import { routes } from '../utils/routeHelpers';

export default function Breadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === '/') return null;

  let currentCategory = '';
  let currentTitle = '';

  // Find the current route details
  for (const section of routes) {
    const foundItem = section.items.find((item) => item.path === currentPath);
    if (foundItem) {
      currentCategory = section.category;
      currentTitle = foundItem.title;
      break;
    }
  }

  if (!currentTitle) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="separator">/</li>
        <li className="category">{currentCategory}</li>
        <li className="separator">/</li>
        <li aria-current="page">{currentTitle}</li>
      </ol>
    </nav>
  );
}