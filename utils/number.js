"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoctoPrice = void 0;
const index_1 = require("./index");
class YoctoPrice {
    constructor(value) {
        this.value = value ? this.parse(value) : 0;
    }
    static from(value) {
        const inst = new YoctoPrice(value);
        return inst;
    }
    plusYocto(value) {
        this.value += this.parse(value);
        return this;
    }
    plus(value) {
        this.value += value;
        return this;
    }
    minusYocto(value) {
        this.value -= this.parse(value);
        return this;
    }
    minus(value) {
        this.value -= value;
        return this;
    }
    mult(value) {
        this.value *= value;
        return this;
    }
    div(value) {
        this.value /= value;
        return this;
    }
    toYocto() {
        return (0, index_1.parseNearAmount)(this.value, 24);
    }
    toRaw() {
        return this.value;
    }
    parse(value) {
        return (0, index_1.formatNearPrice)(value, 24);
    }
}
exports.YoctoPrice = YoctoPrice;
