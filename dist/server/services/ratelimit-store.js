"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ratelimit_1 = require("@upstash/ratelimit");
const redis_1 = require("@upstash/redis");
const middlewares_1 = require("../utils/middlewares");
5;
function createRatelimitStoreService({ strapi }) {
    const config = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    const clients = new Map();
    return {
        addClient(strategy) {
            var _a, _b, _c;
            if (clients.has((0, middlewares_1.getStrategyKey)(strategy))) {
                return clients.get((0, middlewares_1.getStrategyKey)(strategy));
            }
            const { token, url, prefix, analytics } = config;
            let limiterAlgorithm;
            if (((_a = strategy.limiter) === null || _a === void 0 ? void 0 : _a.algorithm) === 'fixed-window') {
                limiterAlgorithm = ratelimit_1.Ratelimit.fixedWindow(strategy.limiter.tokens, strategy.limiter.window);
            }
            if (((_b = strategy.limiter) === null || _b === void 0 ? void 0 : _b.algorithm) === 'sliding-window') {
                limiterAlgorithm = ratelimit_1.Ratelimit.slidingWindow(strategy.limiter.tokens, strategy.limiter.window);
            }
            if (((_c = strategy.limiter) === null || _c === void 0 ? void 0 : _c.algorithm) === 'token-bucket' && strategy.limiter.refillRate) {
                limiterAlgorithm = ratelimit_1.Ratelimit.tokenBucket(strategy.limiter.refillRate, strategy.limiter.window, strategy.limiter.tokens);
            }
            else {
                limiterAlgorithm = ratelimit_1.Ratelimit.fixedWindow(strategy.limiter.tokens, strategy.limiter.window);
            }
            const ratelimitClient = new ratelimit_1.Ratelimit({
                redis: new redis_1.Redis({
                    url,
                    token
                }),
                prefix,
                analytics,
                limiter: limiterAlgorithm,
            });
            clients.set((0, middlewares_1.getStrategyKey)(strategy), ratelimitClient);
            return ratelimitClient;
        },
        clients() {
            return clients;
        }
    };
}
exports.default = createRatelimitStoreService;
