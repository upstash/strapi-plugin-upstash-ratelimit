import { Strapi } from '@strapi/strapi';
import middlewares from './middlewares';
import { Ratelimit } from '@upstash/ratelimit'


type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

type Limiter = {
  algorithm: 'fixed-window' | 'sliding-window' | 'token-bucket'
  tokens: number
  window: Duration
}

export type RatelimitConfig = {
  enabled: boolean;
  url: string;
  token: string
  analytics: boolean;
  prefix: string;
  limiter?: Limiter;

}
export default ({ strapi }: { strapi: Strapi }) => {
  // register phase
  strapi.server.use(async (ctx, next) => {
    const ratelimitConfig: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    const store = strapi.plugin('strapi-plugin-upstash-ratelimit').service('ratelimitStore')
    const client: Ratelimit = store.init()

    console.log(ctx)

    if (ratelimitConfig.enabled) {
      const { success } = await client.limit(ctx.ip, { rate: 1 })

      if (!success) {
        ctx.throw(429, 'Too many request')
        return
      }
    }

    await next();
    return;
  })

};
