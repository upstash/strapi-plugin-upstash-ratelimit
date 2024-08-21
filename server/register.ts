import { Strapi } from '@strapi/strapi';

import { Ratelimit } from '@upstash/ratelimit'


type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

type Limiter = {
  algorithm: 'fixed-window' | 'sliding-window' | 'token-bucket'
  refillRate?: number
  tokens: number
  window: Duration
}

export type Strategy = {
  methods: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE" | "CONNECT" | "ALL")[]
  algorithm: 'fixed-window' | 'sliding-window' | 'token-bucket'
  path: string;
  limiter: Limiter
}

export type RatelimitConfig = {
  enabled: boolean;
  url: string;
  token: string
  analytics: boolean;
  prefix: string;
  strategy: Strategy[]
}
export default ({ strapi }: { strapi: Strapi }) => {


};
