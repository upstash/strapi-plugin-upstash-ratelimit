"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function upstashRatelimit(config, { strapi }) {
    // let ratelimitConfig: { enabled: boolean } = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    // strapi.log.debug(Object.keys(ratelimitConfig));
    // strapi.log.debug('upstashRatelimit middleware');
    return async (ctx, next) => {
        // if (ratelimitConfig.enabled) {
        // }
        // strapi.log.debug('upstashRatelimit middleware');
        strapi.log.debug('upstashRatelimit middleware');
        await next();
    };
}
exports.default = upstashRatelimit;
