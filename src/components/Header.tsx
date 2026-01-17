import '../App.css';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1>System Design Docs</h1>
          </div>
        </div>
        <div className="header-actions">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="github-link"
          >
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
