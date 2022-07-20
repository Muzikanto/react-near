"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../hooks");
function useStorageBalanceOf(opts) {
    return (0, hooks_1.useNearQuery)('storage_balance_od', opts);
}
exports.default = useStorageBalanceOf;
