"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upstash_ratelimit_1 = require("./upstash-ratelimit");
const middlewares = {
    createUpstashRatelimiterMiddleware: upstash_ratelimit_1.createUpstashRatelimiterMiddleware
};
exports.default = { middlewares };
