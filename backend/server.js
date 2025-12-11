import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

import apiRoutes from './routes/api.js';
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('EMTInfo API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
