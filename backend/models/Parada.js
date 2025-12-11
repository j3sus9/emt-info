import mongoose from 'mongoose';

const paradaSchema = new mongoose.Schema({
  codLinea: { type: Number, required: true },
  nombreLinea: { type: String, required: true },
  sentido: { type: Number, required: true }, // 1 or 2
  orden: { type: Number, required: true },
  codParada: { type: Number, required: true },
  nombreParada: { type: String, required: true },
  direccion: { type: String, required: true },
  lon: { type: Number, required: true },
  lat: { type: Number, required: true }
});

export default mongoose.model('Parada', paradaSchema);
