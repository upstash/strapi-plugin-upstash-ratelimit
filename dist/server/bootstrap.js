"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_router_1 = require("./utils/middlewares/create-router");
exports.default = ({ strapi }) => {
    // bootstrap phase
    const config = strapi.config.get('plugin.strapi-plugin-upstash-ratelimit');
    const router = (0, create_router_1.createRouter)(strapi, config.strategy);
    strapi.log.debug('Registering upstash ratelimit middlewares');
    strapi.server.router.use(router.routes());
};
