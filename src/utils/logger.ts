import { createLogger, format, Logger, transports } from 'winston';
import path from 'path';

export class Logging {
  private logger: Logger;

  constructor(){
    this.logger = this.init();
  }

  init(){
    const logger: Logger = createLogger({
      level: 'info', // Level log default
      format: format.combine(
        format.timestamp(), 
        format.printf((info) => {
          return JSON.stringify({
            timestamp: info.timestamp,
            level: info.level,
            message: info.message,
            file: info.file || '', // Tambahkan file dan line jika ada
            line: info.line || ''
          });
        })
      ),
      transports: [
        new transports.Console(), 
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log' })
      ],
    });
    return logger;
  }

  logError = (message: string) => {
    const err = new Error();
    Error.captureStackTrace(err);
    const stack = err.stack?.split('\n')[2]; // Ambil lokasi yang benar di stack
    const match = stack?.match(/\((.*):(\d+):\d+\)/);
  
    const fullFile = match ? match[1] : '';
    const line = match ? parseInt(match[2], 10) : 0;
  
    const file = path.basename(fullFile);
  
    this.logger.error(message, { file, line });
  };

  logInfo = (message: string) => {
    this.logger.info(message);
  };

}