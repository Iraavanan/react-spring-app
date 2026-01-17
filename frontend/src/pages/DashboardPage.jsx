import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your personal dashboard</p>
      </div>

      <div className="dashboard-content">
        <div className="user-card">
          <div className="user-avatar">
            {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="user-info">
            <h2>{user?.firstName} {user?.lastName}</h2>
            <p className="user-email">{user?.email}</p>
          </div>
        </div>

        <div className="info-cards">
          <div className="info-card">
            <h3>Account Details</h3>
            <div className="info-item">
              <span className="info-label">User ID</span>
              <span className="info-value">{user?.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">First Name</span>
              <span className="info-value">{user?.firstName || 'Not set'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Name</span>
              <span className="info-value">{user?.lastName || 'Not set'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">{formatDate(user?.createdAt)}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>Security Status</h3>
            <div className="status-item">
              <span className="status-indicator status-active"></span>
              <span>JWT Authentication Active</span>
            </div>
            <div className="status-item">
              <span className="status-indicator status-active"></span>
              <span>Password Encrypted</span>
            </div>
            <div className="status-item">
              <span className="status-indicator status-active"></span>
              <span>Session Valid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
