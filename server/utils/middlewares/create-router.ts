import { Strapi } from "@strapi/strapi";

import Router from "koa-router";
import { Strategy } from "../../types";
import { createUpstashRatelimiterMiddleware } from "../../middlewares/upstash-ratelimit";

export function createRouter(strapi: Strapi, strategies: Strategy[]) {
	const router = new Router();

	for (const strategy of strategies) {
		const ratelimiterMiddleware = createUpstashRatelimiterMiddleware(strategy, { strapi });

		if (strategy.path === "*") {
			strategy.path = "/api/:path*"
		}

		for (const method of strategy.methods) {
			switch (method) {
				case "ALL":
					strapi.log.info(`[REGISTER] RATELIMIT ALL ${strategy.path}`)
					router.all(strategy.path, ratelimiterMiddleware)
					break;
				case "GET":
					strapi.log.info(`[REGISTER] RATELIMIT GET ${strategy.path}`)
					router.get(strategy.path, ratelimiterMiddleware)
					break;
				case "POST":
					strapi.log.info(`[REGISTER] RATELIMIT POST ${strategy.path}`)
					router.post(strategy.path, ratelimiterMiddleware)
					break;
				case "PUT":
					strapi.log.info(`[REGISTER] RATELIMIT PUT ${strategy.path}`)
					router.put(strategy.path, ratelimiterMiddleware)
					break;
				case "DELETE":
					strapi.log.info(`[REGISTER] RATELIMIT DELETE ${strategy.path}`)
					router.delete(strategy.path, ratelimiterMiddleware)
					break;
				case "PATCH":
					strapi.log.info(`[REGISTER] RATELIMIT PATCH ${strategy.path}`)
					router.patch(strategy.path, ratelimiterMiddleware)
					break;
				case "HEAD":
					strapi.log.info(`[REGISTER] RATELIMIT HEAD ${strategy.path}`)
					router.head(strategy.path, ratelimiterMiddleware)
					break;
				case "OPTIONS":
					strapi.log.info(`[REGISTER] RATELIMIT OPTIONS ${strategy.path}`)
					router.options(strategy.path, ratelimiterMiddleware)
					break;
			}
		}
	}

	return router;
}

