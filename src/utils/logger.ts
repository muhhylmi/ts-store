import { createLogger, format, transports } from 'winston';

// Membuat logger
const logger = createLogger({
  level: 'info', // Level log default
  format: format.combine(
    format.timestamp(), 
    format.json() 
  ),
  transports: [
    new transports.Console(), 
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' })
  ],
});

export default logger;
