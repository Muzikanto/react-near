"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearContractContext = void 0;
const react_1 = __importDefault(require("react"));
exports.NearContractContext = react_1.default.createContext({});
const NearContractProvider = ({ contract, children }) => {
    return (react_1.default.createElement(exports.NearContractContext.Provider, { value: { contract } }, children));
};
exports.default = NearContractProvider;
