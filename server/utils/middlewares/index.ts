import { Strategy } from "../../types"

export const getStrategyKey = (strategy: Strategy) => {
	return `${strategy.methods.join("/")}-${strategy.path}`
}

export const parseRatelimitIdentifier = (identifierKey: string) => {
	const res = identifierKey.split(".")
	const headerKey = res[1]

	return headerKey
}