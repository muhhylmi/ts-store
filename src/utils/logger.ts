import { createLogger, format, Logger, transports } from 'winston';
import path from 'path';
import { Client } from '@elastic/elasticsearch';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import config from '../infrastructure/config';

export class Logging {
  private logger: Logger;
  private esClient: Client;

  constructor(){
    this.esClient = this.createEsClient();
    this.logger = this.initLogger();
  }

  private createEsClient(): Client {
    return new Client({
      node: config.ELASTIC_URL,
      auth: {
        username: config.ELASTIC_USERNAME,
        password: config.ELASTIC_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  public getEsClient(): Client{
    return this.esClient;
  }

  public getEsTransport() {
    const esTransportOpts = {
      level: 'info',
      index: 'ts-store-log', 
      client: this.getEsClient()
    };
    return esTransportOpts;
  }

  public testConnection() {
    this.getEsClient().info().then(data => {
      this.logger.debug(data);
    }).catch(error => {
      this.logger.debug(JSON.stringify(error));
    });
  }

  private initLogger(){
    const logger: Logger = createLogger({
      level: 'debug', // Level log default
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
        new ElasticsearchTransport(this.getEsTransport()),
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

  logDebug = (message: string) => {
    this.logger.debug(message);
  };

}