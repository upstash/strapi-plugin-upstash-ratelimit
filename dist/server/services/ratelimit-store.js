"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ratelimit_1 = require("@upstash/ratelimit");
const redis_1 = require("@upstash/redis");
5;
function createRatelimitStoreService({ strapi }) {
    let client;
    let initialized = false;
    const config = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    return {
        init() {
            const { token, url, rate, prefix, analytics } = config;
            let limiter;
            if (config.algorithm === 'fixed-window') {
                limiter = ratelimit_1.Ratelimit.fixedWindow(rate.limit, rate.duration);
            }
            if (config.algorithm === 'sliding-window') {
                limiter = ratelimit_1.Ratelimit.slidingWindow(rate.limit, rate.duration);
            }
            else {
                limiter = ratelimit_1.Ratelimit.fixedWindow(rate.limit, rate.duration);
            }
            const ratelimitClient = new ratelimit_1.Ratelimit({
                redis: new redis_1.Redis({
                    url,
                    token
                }),
                prefix,
                analytics,
                limiter,
            });
            initialized = true;
            client = ratelimitClient;
            return ratelimitClient;
        }
    };
}
exports.default = createRatelimitStoreService;
