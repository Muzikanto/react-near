"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mutation_1 = __importDefault(require("../hooks/mutation"));
function useStorageUnregister(opts) {
    return (0, mutation_1.default)('storage_unregister', opts);
}
exports.default = useStorageUnregister;
