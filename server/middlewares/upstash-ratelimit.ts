import type { Strapi } from "@strapi/strapi";
import { RatelimitConfig, Strategy } from '../types';
import { Ratelimit } from "@upstash/ratelimit";
import { getStrategyKey } from "../utils/middlewares";


export function createUpstashRatelimiterMiddleware(strategy: Strategy, { strapi }: { strapi: Strapi }) {
	const ratelimitConfig: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
	const store = strapi.plugin('strapi-plugin-upstash-ratelimit').service('ratelimitStore')
	const client: Ratelimit = store.addClient(strategy)

	return async function limit(ctx, next) {
		if (ratelimitConfig.enabled) {
			const result = await client.limit(ctx.ip, { rate: 1 })
			strapi.log.debug(`[RATELIMIT] ${getStrategyKey(strategy)} ${ctx.ip} ${result.remaining} remaining requests`)
			if (!result.success) {
				ctx.throw(429, 'Too many request')
				return
			}
		}

		await next();
		return;
	}
}

