// src/components/Sidebar.jsx
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Knowledge Center</h2>
      <button style={styles.button} onClick={() => navigate("/")}>Dashboard</button>
      <button style={styles.button} onClick={() => navigate("/search")}>Search</button>
      <button style={styles.button} onClick={() => navigate("/about")}>About</button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '15%',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    boxSizing: 'border-box',
    position: 'fixed',
  },
  title: {
    marginBottom: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default Sidebar;