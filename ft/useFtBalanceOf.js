"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hooks_1 = require("../hooks");
function useFtBalanceOf(opts) {
    return (0, hooks_1.useNearQuery)('ft_balance_of', opts);
}
exports.default = useFtBalanceOf;
