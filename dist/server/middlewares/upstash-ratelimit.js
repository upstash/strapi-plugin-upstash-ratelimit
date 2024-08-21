"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUpstashRatelimiterMiddleware = void 0;
const middlewares_1 = require("../utils/middlewares");
function createUpstashRatelimiterMiddleware(strategy, { strapi }) {
    const ratelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    const store = strapi.plugin('strapi-plugin-upstash-ratelimit').service('ratelimitStore');
    const client = store.addClient(strategy);
    return async function limit(ctx, next) {
        if (ratelimitConfig.enabled) {
            const result = await client.limit(ctx.ip, { rate: 1 });
            strapi.log.debug(`[RATELIMIT] ${(0, middlewares_1.getStrategyKey)(strategy)} ${ctx.ip} ${result.remaining} remaining requests`);
            if (!result.success) {
                ctx.throw(429, 'Too many request');
                return;
            }
        }
        await next();
        return;
    };
}
exports.createUpstashRatelimiterMiddleware = createUpstashRatelimiterMiddleware;
