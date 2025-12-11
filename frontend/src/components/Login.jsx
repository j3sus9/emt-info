import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Login = ({ setUser }) => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const user = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        token: credentialResponse.credential,
        exp: decoded.exp
      };

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);

      // Call backend to log login
      try {
        await axios.post('http://localhost:5000/api/log/login', {
          usuario: user.email,
          token: user.token,
          caducidad: new Date(user.exp * 1000)
        });
      } catch (err) {
        console.error('Error logging login to backend:', err);
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>🚍 EMTInfo</h2>
        <p style={{ marginBottom: '2rem', color: '#666' }}>Inicia sesión para acceder al sistema de información de autobuses.</p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
