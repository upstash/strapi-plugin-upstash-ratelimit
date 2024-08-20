"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ratelimit_1 = require("@upstash/ratelimit");
const redis_1 = require("@upstash/redis");
// export default ({ strapi }: { strapi: Strapi }) => ({
//   getRatelimitClient: () => {
// const config: RatelimitConfig = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
// const { token, url, rate } = config
// const ratelimitClient = new Ratelimit({
//   redis: new Redis({
//     url,
//     token
//   },
//   ),
//   limiter: Ratelimit.fixedWindow(rate.limit, '10s')
// })
// return ratelimitClient
//   }
// });
function createRatelimitStoreService({ strapi }) {
    let ratelimitClient;
    let initialized = false;
    const config = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    return {
        init() {
            const { token, url, rate } = config;
            const ratelimitClient = new ratelimit_1.Ratelimit({
                redis: new redis_1.Redis({
                    url,
                    token
                }),
                limiter: ratelimit_1.Ratelimit.fixedWindow(rate.limit, '10s')
            });
            initialized = true;
            return ratelimitClient;
        }
    };
}
exports.default = createRatelimitStoreService;
