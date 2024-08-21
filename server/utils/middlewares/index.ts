import { Strategy } from "../../types"

export const getStrategyKey = (strategy: Strategy) => {
	return `${strategy.methods.join("/")}.${strategy.path}`
}