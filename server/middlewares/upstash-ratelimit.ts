import type { Strapi } from "@strapi/strapi";

function upstashRatelimit(config, { strapi }: { strapi: Strapi }) {
	// let ratelimitConfig: { enabled: boolean } = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
	// strapi.log.debug(Object.keys(ratelimitConfig));
	// strapi.log.debug('upstashRatelimit middleware');


	return async (ctx, next) => {






		// if (ratelimitConfig.enabled) {

		// }
		// strapi.log.debug('upstashRatelimit middleware');
		strapi.log.debug('upstashRatelimit middleware');
		await next();
	}
}

export default upstashRatelimit