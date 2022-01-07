"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NearContractProvider_1 = require("./NearContractProvider");
function useNearContractProvided() {
    const ctx = react_1.default.useContext(NearContractProvider_1.NearContractContext);
    return ctx.contract;
}
exports.default = useNearContractProvided;
