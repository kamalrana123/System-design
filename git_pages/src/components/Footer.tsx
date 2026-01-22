import '../App.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} System Design Docs. Built with React & Markdown.</p>
    </footer>
  );
}
