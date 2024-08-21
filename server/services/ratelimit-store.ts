import { Strapi } from '@strapi/strapi';
import { Algorithm, Ratelimit } from '@upstash/ratelimit';
import { RatelimitConfig } from '../register';
import { Redis } from '@upstash/redis';
5
function createRatelimitStoreService({ strapi }: { strapi: Strapi }) {
  let client: Ratelimit
  let initialized = false;
  const config: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');

  return {
    init() {
      const { token, url, limiter, prefix, analytics } = config

      if (!limiter) return


      let limiterAlgorithm
      if (config.limiter?.algorithm === 'fixed-window') {
        limiterAlgorithm = Ratelimit.fixedWindow(limiter.tokens, limiter.window)
      } if (config.limiter?.algorithm === 'sliding-window') {
        limiterAlgorithm = Ratelimit.slidingWindow(limiter.tokens, limiter.window)
      } else {
        limiterAlgorithm = Ratelimit.fixedWindow(limiter.tokens, limiter.window)
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

      initialized = true
      client = ratelimitClient
      return ratelimitClient
    }
  }
}

export default createRatelimitStoreService;