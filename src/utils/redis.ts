import { createClient, RedisClientType } from 'redis';
import config from '../infrastructure/config';
import { Logging } from './logger';
const ctx = "redis";
class RedisService {
  private client!: RedisClientType;
  private logger: Logging;

  constructor(logger: Logging) {
    this.logger = logger;
    this.initializeRedisClient();

    // Error handling
    // this.connect().then(() => logger.logDebug(ctx, 'Redis Succesfully conected')).catch(err => logger.logError(ctx, err));
  }

  private async initializeRedisClient(): Promise<void> {
    try {
      this.client = createClient({ url: config.REDIS_URL });

      // Set up error handling for the Redis client
      this.client.on('error', (err) => {
        this.logger.logDebug(`Redis Client Error: ${err}`, ctx);
        process.exit(1);
      });

      // Connect to Redis
      await this.client.connect();
      this.logger.logDebug('Redis successfully connected', ctx);
    } catch (error) {
      this.logger.logError('Failed to connect to Redis ' + error, ctx);
    }
  }
  
  // Connect to Redis
  public async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  // Disconnect from Redis
  public async disconnect() {
    if (this.client.isOpen) {
      this.logger.logInfo('Redis disconnected');
      await this.client.disconnect();
    }
  }

  // Get data from Redis
  public async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  // Set data to Redis with an optional expiration time (in seconds)
  public async set(key: string, value: string, expiryInSeconds?: number): Promise<void> {
    if (expiryInSeconds) {
      await this.client.set(key, value, { EX: expiryInSeconds });
    } else {
      await this.client.set(key, value);
    }
  }

  // Delete data from Redis
  public async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default RedisService;
