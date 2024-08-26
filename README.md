<div align="center">
<h1>Strapi Upstash Ratelimit Plugin</h1>
<p style="margin-top: 0;">Ratelimit your Strapi endpoints using globally distributed redis.</p>

[![npm package version](https://badgen.net/npm/v/strapi-plugin-upstash-ratelimit)](https://npmjs.com/package/strapi-plugin-upstash-ratelimit)
[![npm package daily downloads](https://badgen.net/npm/dm/strapi-plugin-upstash-ratelimit)](https://npmjs.com/strapi-plugin-upstash-ratelimit)
[![github stars](https://badgen.net/github/stars/upstash/strapi-plugin-upstash-ratelimit)](https://gitHub.com/upstash/strapi-plugin-upstash-ratelimit)
[![github issues](https://img.shields.io/github/issues/upstash/strapi-plugin-upstash-ratelimit.svg)](https://gitHub.com/upstash/strapi-plugin-upstash-ratelimit/issues/)

</div>

## Features

This plugin provides a way to apply **Route based ratelimiting** to prevent the abuse targeting your endpoints. It uses HTTP and Upstash Redis based ratelimiting under the hood.

The ratelimiting data is stored on a Redis database. You can set a strategy to define which algorithms or which rates to use per endpoint. You can also enable logging, to see the

## Quickstart

### Install

#### npm

```bash
npm install --save @upstash/strapi-plugin-upstash-ratelimit
```

#### yarn

```bash
yarn add @upstash/strapi-plugin-upstash-ratelimit
```

### Create database

Create a new redis database on [Upstash Console](https://console.upstash.com/). See [docs](https://upstash.com/docs/redis/overall/getstarted) for further info related to creating a database.

### Set up environment variables

Get the environment variables from [Upstash Console](https://console.upstash.com/), and set it to `.env` file as below:

```shell
UPSTASH_REDIS_REST_TOKEN="<YOUR_TOKEN>"
UPSTASH_REDIS_REST_URL="<YOUR_URL>"
```

### Configure the Strapi plugin

In the `./config/plugins.ts` file, set the configurations for ratelimiter.

```typescript
export default () => ({
  "strapi-plugin-upstash-ratelimit": {
    enabled: true,
    config: {
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
      url: process.env.UPSTASH_REDIS_REST_URL,
      strategy: [
        {
          methods: ["GET", "POST"],
          path: "*",
          limiter: {
            algorithm: "fixed-window",
            tokens: 10,
            window: "20s",
          },
        },
      ],
      prefix: "@strapi",
    },
  },
});
```

## Documentation

See [the documentation](https://upstash.com/docs/redis/integrations/ratelimit/strapi/getting-started) for more information details about this package.

## License

See the
