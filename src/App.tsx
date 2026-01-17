import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MarkdownViewer from './components/MarkdownViewer';
import { flatRoutes } from './utils/routeHelpers';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {flatRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<MarkdownViewer file={route.file} />}
            />
          ))}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
