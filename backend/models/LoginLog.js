import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  usuario: { type: String, required: true }, // email
  caducidad: { type: Date, required: true },
  token: { type: String, required: true }
});

export default mongoose.model('LoginLog', loginLogSchema);
