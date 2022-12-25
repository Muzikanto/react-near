"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNearDate = exports.formatNearAddress = exports.parseNearAmount = exports.formatNearPrice = exports.isValidNearAddress = exports.NEAR_ACCOUNT_ID_REGEX = exports.getNearCookie = exports.setNearCookie = exports.getNearError = void 0;
// @ts-ignore
const cookie_1 = __importDefault(require("cookie"));
const format_1 = require("near-api-js/lib/utils/format");
function getNearError(e) {
    try {
        if (e.kind && typeof e.kind.ExecutionError === 'string') {
            return e.kind.ExecutionError.split(', filename')[0];
        }
        return String(e).split('panic_msg: "')[1].split('" }')[0];
    }
    catch (e2) {
        // @ts-ignore
        return e.message || String(e);
    }
}
exports.getNearError = getNearError;
const setNearCookie = (path, value, opts = {}) => {
    document.cookie = cookie_1.default.serialize(path, value, {
        maxAge: opts.maxAge,
        path: '/',
    });
};
exports.setNearCookie = setNearCookie;
const getNearCookie = (key) => {
    let parsed = cookie_1.default.parse(document.cookie);
    return parsed[key];
};
exports.getNearCookie = getNearCookie;
exports.NEAR_ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
function isValidNearAddress(address) {
    return exports.NEAR_ACCOUNT_ID_REGEX.test(address);
}
exports.isValidNearAddress = isValidNearAddress;
//
function formatNearPrice(price, decimals = 24) {
    if (decimals === 0) {
        return +price;
    }
    return +(+(0, format_1.formatNearAmount)(price, decimals).split(',').join(''));
}
exports.formatNearPrice = formatNearPrice;
/**
 * Removes commas from the input
 * @param amount A value or amount that may contain commas
 * @returns string The cleaned value
 */
function cleanupAmount(amount) {
    return amount.replace(/,/g, '').trim();
}
/**
 * Removes leading zeroes from an input
 * @param value A value that may contain leading zeroes
 * @returns string The value without the leading zeroes
 */
function trimLeadingZeroes(value) {
    value = value.replace(/^0+/, '');
    if (value === '') {
        return '0';
    }
    return value;
}
function parseNearAmount(value, decimals = 24) {
    let amt = value.toString();
    if (!amt) {
        return '0';
    }
    amt = cleanupAmount(amt);
    const split = amt.split('.');
    const wholePart = split[0];
    const fracPart = split[1] || '';
    if (split.length > 2 || fracPart.length > decimals) {
        throw new Error(`Cannot parse '${amt}' as NEAR amount`);
    }
    return trimLeadingZeroes(wholePart + fracPart.padEnd(decimals, '0'));
}
exports.parseNearAmount = parseNearAmount;
//
function formatNearAddress(address) {
    return address.replace('.testnet', '').replace('.near', '');
}
exports.formatNearAddress = formatNearAddress;
function parseNearDate(blockTimestamp) {
    return new Date(blockTimestamp / 1000000);
}
exports.parseNearDate = parseNearDate;
