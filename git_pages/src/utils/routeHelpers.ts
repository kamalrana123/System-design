// Types for our route structure
export interface RouteItem {
  path: string;
  title: string;
  file: string;
}

export interface RouteCategory {
  category: string;
  children: (RouteItem | RouteCategory)[];
}

import rawRoutes from '../routes.json';

// Cast the raw JSON to our typed structure
export const routes: (RouteItem | RouteCategory)[] = rawRoutes as any;

// Helper to recursively get all RouteItems
function flatten(items: (RouteItem | RouteCategory)[]): RouteItem[] {
  let result: RouteItem[] = [];
  items.forEach(item => {
    if ('path' in item) {
      result.push(item);
    } else if ('children' in item) {
      result = result.concat(flatten(item.children));
    }
  });
  return result;
}

export const flatRoutes: RouteItem[] = flatten(routes);
