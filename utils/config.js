"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NearEnvironment = exports.ONE_NEAR_IN_YOCTO = exports.NEAR_ONE_YOCTO = exports.NEAR_1_T_GAS = exports.NEAR_GAS_MIN = exports.NEAR_GAS_1 = exports.NEAR_MAX_GAS = exports.NEAR_GAS = void 0;
const index_1 = require("./index");
exports.NEAR_GAS = 200000000000000;
exports.NEAR_MAX_GAS = 300000000000000;
exports.NEAR_GAS_1 = 100000000000000;
exports.NEAR_GAS_MIN = 1000000000000;
exports.NEAR_1_T_GAS = exports.NEAR_GAS_MIN;
//
exports.NEAR_ONE_YOCTO = '1';
exports.ONE_NEAR_IN_YOCTO = (0, index_1.parseNearAmount)('1', 24);
var NearEnvironment;
(function (NearEnvironment) {
    NearEnvironment["MainNet"] = "mainnet";
    NearEnvironment["TestNet"] = "testnet";
})(NearEnvironment = exports.NearEnvironment || (exports.NearEnvironment = {}));
