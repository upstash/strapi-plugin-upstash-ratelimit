<div align="center">
<h1>Strapi Upstash Ratelimit Plugin</h1>
<p style="margin-top: 0;">Ratelimit your Strapi endpoints using globally distributed redis.</p>

[![npm package version](https://badgen.net/npm/v/strapi-plugin-upstash-ratelimit)](https://npmjs.com/package/strapi-plugin-upstash-ratelimit)
[![npm package daily downloads](https://badgen.net/npm/dm/strapi-plugin-upstash-ratelimit)](https://npmjs.com/strapi-plugin-upstash-ratelimit)
[![github stars](https://badgen.net/github/stars/upstash/strapi-plugin-upstash-ratelimit)](https://gitHub.com/upstash/strapi-plugin-upstash-ratelimit)
[![github issues](https://img.shields.io/github/issues/upstash/strapi-plugin-upstash-ratelimit.svg)](https://gitHub.com/upstash/strapi-plugin-upstash-ratelimit/issues/)

</div>

> [!NOTE]  
> **This project is in the Experimental Stage.**
> We declare this project experimental to set clear expectations for your usage. There could be known or unknown bugs, the API could evolve, or the project could be discontinued if it does not find community adoption. While we cannot provide professional support for experimental projects, we’d be happy to hear from you if you see value in this project!

## Quickstart

### Install

#### npm

```bash
npm install --save strapi-plugin-strapi-algolia
```

#### yarn

```bash
yarn add strapi-plugin-strapi-algolia
```

### Create database

Create a new redis database on [Upstash Console](https://console.upstash.com/). See [docs](https://upstash.com/docs/redis/overall/getstarted) for further info related to creating a database.

### Set up environment variables

Get the environment variables from [Upstash Console](https://console.upstash.com/), and set it to `.env` file as below:

```
UPSTASH_REDIS_REST_TOKEN="<YOUR_TOKEN>"
UPSTASH_REDIS_REST_URL="<YOUR_URL>"
```

### Configure the Strapi plugin

In the `./config/plugins.ts` file, set the configurations for ratelimiter.

```
export default () => ({
	'strapi-plugin-upstash-ratelimit': {
		enabled: true,
		resolve: './src/plugins/strapi-plugin-upstash-ratelimit',
		config: {
			enabled: true,
			token: process.env.UPSTASH_REDIS_REST_TOKEN,
			url: process.env.UPSTASH_REDIS_REST_URL,
			strategy: [
				{
					methods: ["GET", "POST"],
					path: "*",
					limiter: {
						algorithm: 'fixed-window',
						tokens: 10,
						window: '20s'
					}
				},
			],
			prefix: "@strapi"
		}
	},
});
```

## Documentation

See [the documentation](https://upstash.com/docs/redis) for more information details about this package.
