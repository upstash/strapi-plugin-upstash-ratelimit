import { Strapi } from '@strapi/strapi';
import { Ratelimit } from '@upstash/ratelimit';
import { RatelimitConfig, Strategy } from '../types';
import { Redis } from '@upstash/redis';
import { getStrategyKey } from '../utils/middlewares';
5
function createRatelimitStoreService({ strapi }: { strapi: Strapi }) {
  const config: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
  const clients = new Map<string, Ratelimit>()
  return {
    addClient(strategy: Strategy) {
      if (clients.has(getStrategyKey(strategy))) {
        return clients.get(getStrategyKey(strategy))
      }

      let { token, url, prefix, analytics } = config

      prefix = `${prefix}:${getStrategyKey(strategy)}`

      let limiterAlgorithm
      if (strategy.limiter?.algorithm === 'fixed-window') {
        limiterAlgorithm = Ratelimit.fixedWindow(strategy.limiter.tokens, strategy.limiter.window)
      } if (strategy.limiter?.algorithm === 'sliding-window') {
        limiterAlgorithm = Ratelimit.slidingWindow(strategy.limiter.tokens, strategy.limiter.window)
      } if (strategy.limiter?.algorithm === 'token-bucket' && strategy.limiter.refillRate) {
        limiterAlgorithm = Ratelimit.tokenBucket(strategy.limiter.refillRate, strategy.limiter.window, strategy.limiter.tokens)
      } else {
        limiterAlgorithm = Ratelimit.fixedWindow(strategy.limiter.tokens, strategy.limiter.window)
      }

      const ratelimitClient = new Ratelimit({
        redis: new Redis({
          url,
          token
        },
        ),
        prefix,
        analytics,
        limiter: limiterAlgorithm,
      })

      clients.set(getStrategyKey(strategy), ratelimitClient)
      return ratelimitClient
    },

    clients() {
      return clients
    }


  }
}

export default createRatelimitStoreService;