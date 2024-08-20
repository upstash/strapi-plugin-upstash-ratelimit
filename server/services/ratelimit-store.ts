import { Strapi } from '@strapi/strapi';
import { Ratelimit } from '@upstash/ratelimit';
import { RatelimitConfig } from '../register';
import { Redis } from '@upstash/redis';
// export default ({ strapi }: { strapi: Strapi }) => ({

//   getRatelimitClient: () => {
// const config: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');

// const { token, url, rate } = config

// const ratelimitClient = new Ratelimit({
//   redis: new Redis({
//     url,
//     token
//   },
//   ),
//   limiter: Ratelimit.fixedWindow(rate.limit, '10s')
// })

// return ratelimitClient

//   }
// });
function createRatelimitStoreService({ strapi }: { strapi: Strapi }) {
  let ratelimitClient
  let initialized = false;
  const config: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');

  return {
    init() {
      const { token, url, rate } = config

      const ratelimitClient = new Ratelimit({
        redis: new Redis({
          url,
          token
        },
        ),
        limiter: Ratelimit.fixedWindow(rate.limit, '10s')
      })

      initialized = true
      return ratelimitClient
    }
  }
}

export default createRatelimitStoreService;