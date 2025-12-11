import mongoose from 'mongoose';

const filterLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  usuario: { type: String, required: true },
  accion: { type: String, required: true }
});

export default mongoose.model('FilterLog', filterLogSchema);
