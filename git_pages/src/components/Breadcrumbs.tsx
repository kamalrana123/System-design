import { useLocation, Link } from 'react-router-dom';
import { routes } from '../utils/routeHelpers';
import type { RouteItem, RouteCategory } from '../utils/routeHelpers';

export default function Breadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;

  if (currentPath === '/' || currentPath === '') return null;

  let currentCategory = '';
  let currentTitle = '';

  // Recursive function to find the route and its parent category
  const findRoute = (items: (RouteItem | RouteCategory)[], parentCategory: string = ''): boolean => {
    for (const item of items) {
      if ('path' in item) {
        if (item.path === currentPath) {
          currentTitle = item.title;
          currentCategory = parentCategory;
          return true;
        }
      } else if ('children' in item) {
        if (findRoute(item.children, item.category)) {
          // If we found it in a sub-category, we could potentially build a longer trail,
          // but for now let's keep it simple with the immediate parent or the top parent.
          // To support full trails, we'd need to return an array of categories.
          return true;
        }
      }
    }
    return false;
  };

  findRoute(routes);

  if (!currentTitle) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="separator">/</li>
        {currentCategory && (
          <>
            <li className="category">{currentCategory}</li>
            <li className="separator">/</li>
          </>
        )}
        <li aria-current="page">{currentTitle}</li>
      </ol>
    </nav>
  );
}