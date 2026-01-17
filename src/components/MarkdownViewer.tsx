import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import TableOfContents from './TableOfContents';
import { flatRoutes } from '../utils/routeHelpers';

interface MarkdownViewerProps {
  file: string;
}

export default function MarkdownViewer({ file }: MarkdownViewerProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Find current index
  const currentIndex = flatRoutes.findIndex(r => r.file === file);
  const prevRoute = currentIndex > 0 ? flatRoutes[currentIndex - 1] : null;
  const nextRoute = currentIndex < flatRoutes.length - 1 ? flatRoutes[currentIndex + 1] : null;

  useEffect(() => {
    setLoading(true);
    // Add a timestamp to avoid caching issues during development/updates
    fetch(`/content/${file}?t=${new Date().getTime()}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load content');
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setContent('# Error 404\n\nPage not found or content missing.');
        setLoading(false);
      });
  }, [file]);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };

  const HeadingRenderer = ({ level, children, ...props }: any) => {
    const text = children?.[0] || '';
    const id = typeof text === 'string' ? slugify(text) : '';
    const Tag = `h${level}` as React.ElementType;
    return <Tag id={id} {...props}>{children}</Tag>;
  };

  if (loading) {
    return <div className="loading-state">Loading content...</div>;
  }

  return (
    <div className="doc-layout">
      <div className="doc-main">
        <div className="doc-container">
          <div className="markdown-body">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code: ({node, ...props}) => <CodeBlock {...props} />,
                h2: (props) => <HeadingRenderer level={2} {...props} />,
                h3: (props) => <HeadingRenderer level={3} {...props} />
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          
          <div className="doc-navigation">
            {prevRoute ? (
              <Link to={prevRoute.path} className="nav-btn prev">
                <span className="nav-label">Previous</span>
                <span className="nav-title">← {prevRoute.title}</span>
              </Link>
            ) : <div />}
            
            {nextRoute && (
              <Link to={nextRoute.path} className="nav-btn next">
                <span className="nav-label">Next</span>
                <span className="nav-title">{nextRoute.title} →</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="doc-sidebar">
        <TableOfContents content={content} />
      </div>
    </div>
  );
}