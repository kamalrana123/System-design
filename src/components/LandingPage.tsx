import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Master <span className="gradient-text">System Design</span> <br />
            & Architecture
          </h1>
        </div>
        <div className="hero-visual">
          <div className="visual-circle"></div>
          <div className="visual-card card-1">
            <div className="card-icon">⚡</div>
            <div className="card-text">High Performance</div>
          </div>
          <div className="visual-card card-2">
            <div className="card-icon">🛡️</div>
            <div className="card-text">Scalability</div>
          </div>
          <div className="visual-card card-3">
            <div className="card-icon">🔍</div>
            <div className="card-text">Deep Dive</div>
          </div>
        </div>
      </section>

      <section className="features-grid">
        <Link to="/architecture" className="feature-card">
          <div className="feature-icon">🏗️</div>
          <h3>System Architecture</h3>
          <p>Learn the building blocks of modern distributed systems, from load balancers to microservices.</p>
        </Link>
        
        <Link to="/db-indexing" className="feature-card">
          <div className="feature-icon">🗄️</div>
          <h3>Database Internals</h3>
          <p>Deep dive into B-Trees, LSM Trees, and indexing strategies to optimize your queries.</p>
        </Link>

        <Link to="/database" className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Data Design</h3>
          <p>Best practices for schema design, normalization, and choosing the right database for the job.</p>
        </Link>
      </section>
    </div>
  );
}