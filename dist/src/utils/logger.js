"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/logger.ts
const winston_1 = require("winston");
// Membuat logger
const logger = (0, winston_1.createLogger)({
    level: 'info', // Level log default
    format: winston_1.format.combine(winston_1.format.timestamp(), // Menambahkan timestamp
    winston_1.format.json() // Format output dalam JSON
    ),
    transports: [
        new winston_1.transports.Console(), // Output ke console
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }), // Menyimpan error ke file
        new winston_1.transports.File({ filename: 'combined.log' }) // Menyimpan semua log ke file
    ],
});
// Ekspor logger agar bisa digunakan di file lain
exports.default = logger;
