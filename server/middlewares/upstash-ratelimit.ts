import type { Strapi } from "@strapi/strapi";
import { RatelimitConfig, Strategy } from '../types';
import { Ratelimit } from "@upstash/ratelimit";
import { getStrategyKey, parseRatelimitIdentifier } from "../utils/middlewares";
import { Context } from 'koa'

export function createUpstashRatelimiterMiddleware(strategy: Strategy, { strapi }: { strapi: Strapi }) {
	const store = strapi.plugin('strapi-plugin-upstash-ratelimit').service('ratelimitStore')
	const client: Ratelimit = store.addClient(strategy)

	return async function limit(ctx: Context, next) {
		if (!strategy.disabled) {
			let identifier: string
			if (strategy.identifierSource === 'ip') {
				identifier = ctx.ip
			} else if (strategy.identifierSource.startsWith('header.')) {
				const headerIdentifier = parseRatelimitIdentifier(strategy.identifierSource)

				if (!(headerIdentifier in ctx.headers)) {
					strapi.log.error(`[RATELIMIT] Missing identifier ${headerIdentifier} in headers`)
					ctx.throw(500, 'Missing identifier in headers')
				}

				identifier = ctx.headers[headerIdentifier] as string
			} else {
				strapi.log.error(`[RATELIMIT] Invalid identifier source ${strategy.identifierSource}`)
				ctx.throw(500, 'Invalid identifier source')
			}

			const result = await client.limit(identifier, { rate: 1 })

			if (!result.success) {
				if (strategy.debug) {
					strapi.log.debug(`[RATELIMIT] PATH:${getStrategyKey(strategy)} IDENTIFIER:${identifier} rejected due to rate limit`)
				}
				ctx.throw(429, 'Too many request')
			}

			if (strategy.debug) {
				strapi.log.debug(`[RATELIMIT] PATH:${getStrategyKey(strategy)} IDENTIFIER:${identifier}, ${result.remaining} remaining requests`)
			}
		}

		await next();
		return;
	}
}

