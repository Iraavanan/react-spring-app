import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AuthApp</Link>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <span className="navbar-user">Welcome, {user?.firstName || user?.email}</span>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <button onClick={logout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" className="navbar-link">Sign In</Link>
            <Link to="/signup" className="navbar-link navbar-link-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
