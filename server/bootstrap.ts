import { Strapi } from '@strapi/strapi';
import { createRouter } from './utils/middlewares/create-router';
import { RatelimitConfig } from './types';
export default ({ strapi }: { strapi: Strapi }) => {
  // bootstrap phase

  const config: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
  const router = createRouter(strapi, config.strategy)

  strapi.log.debug('Registering upstash ratelimit middlewares')
  strapi.server.router.use(router.routes())
};
