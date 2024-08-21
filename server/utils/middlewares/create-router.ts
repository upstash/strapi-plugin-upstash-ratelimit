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
					strapi.log.debug(`[REGISTER] ALL ${strategy.path}`)
					router.all(strategy.path, ratelimiterMiddleware)
					break;
				case "GET":
					strapi.log.debug(`[REGISTER] GET ${strategy.path}`)
					router.get(strategy.path, ratelimiterMiddleware)
					break;
				case "POST":
					strapi.log.debug(`[REGISTER] POST ${strategy.path}`)
					router.post(strategy.path, ratelimiterMiddleware)
					break;
				case "PUT":
					strapi.log.debug(`[REGISTER] PUT ${strategy.path}`)
					router.put(strategy.path, ratelimiterMiddleware)
					break;
				case "DELETE":
					strapi.log.debug(`[REGISTER] DELETE ${strategy.path}`)
					router.delete(strategy.path, ratelimiterMiddleware)
					break;
				case "PATCH":
					strapi.log.debug(`[REGISTER] PATCH ${strategy.path}`)
					router.patch(strategy.path, ratelimiterMiddleware)
					break;
			}
		}
	}

	return router;
}

