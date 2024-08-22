
type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

type Limiter = {
	algorithm: 'fixed-window' | 'sliding-window' | 'token-bucket'
	refillRate?: number
	tokens: number
	window: Duration
}

export type Strategy = {
	methods: ("GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "ALL")[]
	algorithm: 'fixed-window' | 'sliding-window' | 'token-bucket'
	identifierSource: "ip" | `header.${string}`
	path: string;
	limiter: Limiter
	debug?: boolean

}

export type RatelimitConfig = {
	enabled: boolean;
	url: string;
	token: string
	analytics: boolean;
	prefix: string;
	strategy: Strategy[]
}