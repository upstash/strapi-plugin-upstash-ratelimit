"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const upstash_ratelimit_1 = require("../../middlewares/upstash-ratelimit");
function createRouter(stapi, strategies) {
    const router = new koa_router_1.default();
    for (const strategy of strategies) {
        const ratelimiterMiddleware = (0, upstash_ratelimit_1.createUpstashRatelimiterMiddleware)(strategy, { strapi });
        if (strategy.path === "*") {
            strategy.path = "/api/:path*";
        }
        for (const method of strategy.methods) {
            switch (method) {
                case "ALL":
                    strapi.log.debug(`[REGISTER] ALL ${strategy.path}`);
                    router.all(strategy.path, ratelimiterMiddleware);
                    break;
                case "GET":
                    strapi.log.debug(`[REGISTER] GET ${strategy.path}`);
                    router.get(strategy.path, ratelimiterMiddleware);
                    break;
                case "POST":
                    strapi.log.debug(`[REGISTER] POST ${strategy.path}`);
                    router.post(strategy.path, ratelimiterMiddleware);
                    break;
                case "PUT":
                    strapi.log.debug(`[REGISTER] PUT ${strategy.path}`);
                    router.put(strategy.path, ratelimiterMiddleware);
                    break;
                case "DELETE":
                    strapi.log.debug(`[REGISTER] DELETE ${strategy.path}`);
                    router.delete(strategy.path, ratelimiterMiddleware);
                    break;
                case "PATCH":
                    strapi.log.debug(`[REGISTER] PATCH ${strategy.path}`);
                    router.patch(strategy.path, ratelimiterMiddleware);
                    break;
            }
        }
    }
    return router;
}
exports.createRouter = createRouter;
