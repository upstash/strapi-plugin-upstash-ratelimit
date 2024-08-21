import { Strategy } from "../../register";

export const getStrategyKey = (strategy: Strategy) => {
	return `${strategy.methods.join("-")}.${strategy.path}`
}