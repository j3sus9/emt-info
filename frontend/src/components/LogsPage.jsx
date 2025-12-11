import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogsPage = () => {
  const [loginLogs, setLoginLogs] = useState([]);
  const [filterLogs, setFilterLogs] = useState([]);
  const [view, setView] = useState('login'); // 'login' or 'filter'

  useEffect(() => {
    fetchLoginLogs();
  }, []);

  const fetchLoginLogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/log/login`);
      setLoginLogs(res.data);
      setView('login');
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilterLogs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/log/filter`);
      setFilterLogs(res.data);
      setView('filter');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>Registros del Sistema</h2>
        <div>
          <button 
            onClick={fetchLoginLogs} 
            className={view === 'login' ? '' : 'secondary'}
            style={{ marginRight: '1rem' }}
          >
            Logs de Login
          </button>
          <button 
            onClick={fetchFilterLogs}
            className={view === 'filter' ? '' : 'secondary'}
          >
            Logs de Filtrado
          </button>
        </div>
      </div>

      {view === 'login' && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Historial de Accesos</h3>
          {loginLogs.length === 0 ? <p>No hay logs de login.</p> : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Caducidad Token</th>
                </tr>
              </thead>
              <tbody>
                {loginLogs.map(log => (
                  <tr key={log._id}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.usuario}</td>
                    <td>{new Date(log.caducidad).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}

      {view === 'filter' && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Historial de Filtros</h3>
          {filterLogs.length === 0 ? <p>No hay logs de filtrado.</p> : (
          <div style={{ background: '#2d2d2d', color: '#f8f8f2', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', maxHeight: '500px', overflowY: 'auto' }}>
            {filterLogs.map(log => (
              <div key={log._id} style={{ padding: '4px 0', borderBottom: '1px solid #444' }}>
                <span style={{ color: '#ff79c6' }}>{new Date(log.timestamp).toISOString()}</span>{' '}
                <span style={{ color: '#8be9fd' }}>{log.usuario}</span>{' '}
                <span style={{ color: '#f1fa8c' }}>{log.accion}</span>
              </div>
            ))}
          </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LogsPage;
