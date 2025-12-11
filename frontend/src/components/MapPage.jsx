import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapPage = ({ user }) => {
  const [paradas, setParadas] = useState([]);
  const [filters, setFilters] = useState({
    linea: '',
    sentido: '',
    nombre: '',
    direccion: ''
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const fetchAllParadas = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/paradas`);
      setParadas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllParadas();
  }, []);

  const clearFilters = () => {
    setFilters({
      linea: '',
      sentido: '',
      nombre: '',
      direccion: ''
    });
    fetchAllParadas();
  };

  const searchByLine = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/paradas`, {
        params: { linea: filters.linea, sentido: filters.sentido, usuario: user.email }
      });
      setParadas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchByName = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/paradas`, {
        params: { nombre: filters.nombre, usuario: user.email }
      });
      setParadas(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchByAddress = async (e) => {
    e.preventDefault();
    try {
      // Geocode address using Nominatim
      const geoRes = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${filters.direccion}`);
      if (geoRes.data && geoRes.data.length > 0) {
        const { lat, lon } = geoRes.data[0];
        
        // Call backend with coordinates
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/paradas`, {
          params: { lat, lon, direccion: filters.direccion, usuario: user.email }
        });
        setParadas(res.data);
      } else {
        alert('Dirección no encontrada');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="map-page-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Filtros</h3>
          <button onClick={clearFilters} className="secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Limpiar</button>
        </div>
        
        <div className="filter-section">
          <form onSubmit={searchByLine}>
            <h4>Por Línea</h4>
            <input 
              type="number" 
              name="linea" 
              placeholder="Línea" 
              value={filters.linea} 
              onChange={handleFilterChange} 
              required 
            />
            <input 
              type="number" 
              name="sentido" 
              placeholder="Sentido (1 or 2)" 
              value={filters.sentido} 
              onChange={handleFilterChange} 
              required 
            />
            <button type="submit" style={{ width: '100%' }}>Buscar</button>
          </form>
        </div>

        <div className="filter-section">
          <form onSubmit={searchByName}>
            <h4>Por Nombre</h4>
            <input 
              type="text" 
              name="nombre" 
              placeholder="Nombre Parada" 
              value={filters.nombre} 
              onChange={handleFilterChange} 
              required 
            />
            <button type="submit" style={{ width: '100%' }}>Buscar</button>
          </form>
        </div>

        <div className="filter-section">
          <form onSubmit={searchByAddress}>
            <h4>Por Dirección</h4>
            <input 
              type="text" 
              name="direccion" 
              placeholder="Dirección (ej: Salitre 30, Málaga)" 
              value={filters.direccion} 
              onChange={handleFilterChange} 
              required 
            />
            <button type="submit" style={{ width: '100%' }}>Buscar</button>
          </form>
        </div>
      </div>

      <div className="map-container-wrapper">
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, background: 'white', padding: '5px 10px', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
          Paradas encontradas: {paradas.length}
        </div>
        <MapContainer center={[36.7213, -4.4214]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {paradas.map(parada => (
            <Marker key={parada._id} position={[parada.lat, parada.lon]}>
              <Popup>
                <b>{parada.nombreParada}</b><br />
                Línea: {parada.nombreLinea}<br />
                Dirección: {parada.direccion}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
