// Types for our route structure
export interface RouteItem {
  path: string;
  title: string;
  file: string;
}

export interface RouteCategory {
  category: string;
  items: RouteItem[];
}

import rawRoutes from '../routes.json';

// Cast the raw JSON to our typed structure
export const routes: RouteCategory[] = rawRoutes;

// Helper to get a flat list of all route items for easier linear navigation (next/prev)
export const flatRoutes: RouteItem[] = routes.flatMap(category => category.items);
