import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './components/Login'
import MapPage from './components/MapPage'
import LogsPage from './components/LogsPage'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        {user && (
          <nav className="navbar">
            <div className="nav-brand">
              <span>🚍 EMTInfo</span>
            </div>
            <div className="nav-links">
              <span>Hola, {user.name || user.email}</span>
              <Link to="/" className="nav-link">Mapa</Link>
              <Link to="/logs" className="nav-link">Logs</Link>
              <button onClick={handleLogout} className="btn-logout">Cerrar Sesión</button>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <MapPage user={user} /> : <Navigate to="/login" />} />
          <Route path="/logs" element={user ? <LogsPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
