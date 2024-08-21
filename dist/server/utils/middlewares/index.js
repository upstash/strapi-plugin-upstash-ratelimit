"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStrategyKey = void 0;
const getStrategyKey = (strategy) => {
    return `${strategy.methods.join("-")}.${strategy.path}`;
};
exports.getStrategyKey = getStrategyKey;
