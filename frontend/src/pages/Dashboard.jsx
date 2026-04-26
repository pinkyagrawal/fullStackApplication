import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    // If no token found → redirect to login immediately
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null; // Prevents flash before redirect

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <span style={styles.navBrand}>MyApp</span>
        <div style={styles.navRight}>
          <span style={styles.navUser}>👋 {user.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        {/* Welcome card */}
        <div style={styles.welcomeCard}>
          <div style={styles.avatar}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={styles.welcomeTitle}>
              Welcome back, {user.name}! 🎉
            </h1>
            <p style={styles.welcomeSubtitle}>{user.email}</p>
          </div>
        </div>

        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>🔐</span>
            <h3 style={styles.statNumber}>Active</h3>
            <p style={styles.statLabel}>Session Status</p>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>✅</span>
            <h3 style={styles.statNumber}>Verified</h3>
            <p style={styles.statLabel}>Account Status</p>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statIcon}>🗄️</span>
            <h3 style={styles.statNumber}>MongoDB</h3>
            <p style={styles.statLabel}>Database</p>
          </div>
        </div>

        {/* Info card */}
        <div style={styles.infoCard}>
          <h2 style={styles.infoTitle}>Account Details</h2>
          <div style={styles.infoRow}>
            <span style={styles.infoKey}>Name</span>
            <span style={styles.infoValue}>{user.name}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.infoKey}>Email</span>
            <span style={styles.infoValue}>{user.email}</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.infoKey}>User ID</span>
            <span style={{ ...styles.infoValue, fontSize: '13px', color: '#999' }}>
              {user.id}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Segoe UI, sans-serif',
  },
  navbar: {
    backgroundColor: '#4f46e5',
    padding: '16px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navBrand: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  navUser: {
    color: '#e0e0ff',
    fontSize: '15px',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    border: '2px solid #fff',
    color: '#fff',
    padding: '7px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '28px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    backgroundColor: '#4f46e5',
    color: '#fff',
    fontSize: '28px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  welcomeTitle: {
    margin: '0 0 6px',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a2e',
  },
  welcomeSubtitle: {
    margin: 0,
    color: '#888',
    fontSize: '14px',
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  statCard: {
    flex: 1,
    minWidth: '160px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  statIcon: {
    fontSize: '28px',
  },
  statNumber: {
    margin: '8px 0 4px',
    fontSize: '18px',
    fontWeight: '700',
    color: '#4f46e5',
  },
  statLabel: {
    margin: 0,
    fontSize: '13px',
    color: '#888',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  infoTitle: {
    margin: '0 0 20px',
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a2e',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
  },
  infoKey: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#888',
  },
  infoValue: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1a1a2e',
  },
  divider: {
    height: '1px',
    backgroundColor: '#f0f0f0',
  },
};