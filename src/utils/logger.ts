// src/logger.ts
import { createLogger, format, transports } from 'winston';

// Membuat logger
const logger = createLogger({
  level: 'info', // Level log default
  format: format.combine(
    format.timestamp(), // Menambahkan timestamp
    format.json() // Format output dalam JSON
  ),
  transports: [
    new transports.Console(), // Output ke console
    new transports.File({ filename: 'error.log', level: 'error' }), // Menyimpan error ke file
    new transports.File({ filename: 'combined.log' }) // Menyimpan semua log ke file
  ],
});

// Ekspor logger agar bisa digunakan di file lain
export default logger;
