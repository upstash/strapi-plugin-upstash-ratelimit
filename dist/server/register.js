"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    // register phase
    // middlewares.upstashRatelimit
    strapi.server.use(async (ctx, next) => {
        const ratelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
        const store = strapi.plugin('strapi-plugin-upstash-ratelimit').service('ratelimitStore');
        const client = store.init();
        // strapi.log.debug(ratelimitConfig.token, ratelimitConfig.url)
        console.log(ratelimitConfig);
        console.log(ctx);
        if (ratelimitConfig.enabled) {
            const result = await client.limit(ctx.ip, { rate: 1 });
            console.log(result);
            if (result.success) {
                ctx.throw(429, 'Too many requests');
            }
            // const result = await ratelimit.limit(ctx.ip, { rate: 1 })
            // console.log(result)
            // if (!result.success) {
            //   ctx.throw(429, 'Too many requests')
            // }
        }
        await next();
        return;
        // console.log(ctx)
        // strapi.log.info(Object.keys(ctx))
        // strapi.log.info(Object.keys(ctx.request))
        // strapi.log.info(ctx.request)
        // strapi.log.debug('MIDDLEWARES')
        await next();
    });
};
