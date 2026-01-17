import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to AuthApp</h1>
        <p>A secure authentication system built with React and Spring Boot</p>
        <div className="hero-buttons">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
              <Link to="/signin" className="btn btn-secondary">Sign In</Link>
            </>
          )}
        </div>
      </div>
      <div className="features">
        <div className="feature-card">
          <h3>Secure Authentication</h3>
          <p>JWT-based authentication with encrypted passwords</p>
        </div>
        <div className="feature-card">
          <h3>Modern Stack</h3>
          <p>React frontend with Spring Boot backend</p>
        </div>
        <div className="feature-card">
          <h3>Cloud Ready</h3>
          <p>Designed for AWS deployment with Oracle RDS</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
