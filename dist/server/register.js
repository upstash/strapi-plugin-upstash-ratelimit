"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    // register phase
    strapi.server.use(async (ctx, next) => {
        const ratelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
        const store = strapi.plugin('strapi-plugin-upstash-ratelimit').service('ratelimitStore');
        const client = store.init();
        console.log(ctx);
        if (ratelimitConfig.enabled) {
            const { success } = await client.limit(ctx.ip, { rate: 1 });
            if (!success) {
                ctx.throw(429, 'Too many request');
                return;
            }
        }
        await next();
        return;
    });
};
