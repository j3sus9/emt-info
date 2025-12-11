import express from 'express';
import Parada from '../models/Parada.js';
import LoginLog from '../models/LoginLog.js';
import FilterLog from '../models/FilterLog.js';

const router = express.Router();

// POST /api/log/login
router.post('/log/login', async (req, res) => {
  console.log('POST /api/log/login body:', req.body);
  try {
    const { usuario, token, caducidad } = req.body;
    const log = new LoginLog({ usuario, token, caducidad });
    await log.save();
    console.log('Login log saved:', log);
    res.status(201).json(log);
  } catch (error) {
    console.error('Error saving login log:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/log/login
router.get('/log/login', async (req, res) => {
  console.log('GET /api/log/login');
  try {
    const logs = await LoginLog.find().sort({ timestamp: -1 });
    console.log(`Found ${logs.length} login logs`);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching login logs:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/log/filter
router.get('/log/filter', async (req, res) => {
  console.log('GET /api/log/filter');
  try {
    const logs = await FilterLog.find().sort({ timestamp: -1 });
    console.log(`Found ${logs.length} filter logs`);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching filter logs:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/paradas
router.get('/paradas', async (req, res) => {
  console.log('GET /api/paradas request received');
  try {
    const { linea, sentido, nombre, lat, lon, direccion, usuario } = req.query;
    console.log('Query params:', req.query);
    let query = {};
    let accion = '';

    if (linea && sentido) {
      query = { codLinea: linea, sentido: sentido };
      accion = `filtrar?linea=${linea}&sentido=${sentido}`;
    } else if (nombre) {
      query = { nombreParada: { $regex: nombre, $options: 'i' } };
      accion = `filtrar?nombre=${nombre}`;
    } else if (lat && lon) {
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      query = {
        lat: { $gt: latNum - 0.003, $lt: latNum + 0.003 },
        lon: { $gt: lonNum - 0.003, $lt: lonNum + 0.003 }
      };
      accion = direccion ? `filtrar?dir=${direccion}` : `filtrar?lat=${lat}&lon=${lon}`;
    } else {
        accion = 'Listado completo';
    }

    // Log filter action if user is present and a filter was applied
    if (usuario && accion !== 'Listado completo') {
       const log = new FilterLog({ usuario, accion });
       await log.save();
    }

    const paradas = await Parada.find(query);
    console.log(`Found ${paradas.length} paradas`);
    res.json(paradas);
  } catch (error) {
    console.error('Error fetching paradas:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
