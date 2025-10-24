import Logger from "bunyan";
import { config } from "@root/config";
import { BaseCache } from "@services/redis/base.cache";

const log:Logger = config.createLogger('RedisConnection');

class RedisConnection extends BaseCache {
  constructor(){
    super('RedisConnection');
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      const res = await this.client.ping();
      console.log(res, "Redis Connection");
    } catch (error) {
      log.error(error)
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
