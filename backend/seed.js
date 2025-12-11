import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Parada from './models/Parada.js';

dotenv.config();

const paradasData = [
  {
    codLinea: 1,
    nombreLinea: 'Línea 1',
    sentido: 1,
    orden: 1,
    codParada: 101,
    nombreParada: 'Alameda Principal',
    direccion: 'Alameda Principal, 1',
    lat: 36.717,
    lon: -4.423
  },
  {
    codLinea: 1,
    nombreLinea: 'Línea 1',
    sentido: 1,
    orden: 2,
    codParada: 102,
    nombreParada: 'Paseo del Parque',
    direccion: 'Paseo del Parque, s/n',
    lat: 36.719,
    lon: -4.418
  },
  {
    codLinea: 1,
    nombreLinea: 'Línea 1',
    sentido: 2,
    orden: 1,
    codParada: 103,
    nombreParada: 'Plaza de la Marina',
    direccion: 'Plaza de la Marina, 2',
    lat: 36.718,
    lon: -4.421
  },
  {
    codLinea: 3,
    nombreLinea: 'Línea 3',
    sentido: 1,
    orden: 1,
    codParada: 301,
    nombreParada: 'El Palo',
    direccion: 'Av. Juan Sebastián Elcano, 10',
    lat: 36.722,
    lon: -4.355
  },
  {
    codLinea: 11,
    nombreLinea: 'Línea 11',
    sentido: 1,
    orden: 5,
    codParada: 1105,
    nombreParada: 'Teatinos',
    direccion: 'Av. Plutarco, 15',
    lat: 36.715,
    lon: -4.475
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    await Parada.deleteMany({});
    console.log('Paradas collection cleared');

    await Parada.insertMany(paradasData);
    console.log('Paradas seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
