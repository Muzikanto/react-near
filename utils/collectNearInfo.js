"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectNearData = exports.collectNearDataWithoutRender = void 0;
const client_1 = require("../core/client");
function collectNearDataWithoutRender(nearClient) {
    return __awaiter(this, void 0, void 0, function* () {
        const SSR = nearClient.cache.SSR || {};
        for (const key in SSR) {
            const _call = SSR[key];
            const contract = nearClient.getContract((0, client_1.encodeRequest)(_call.contractId));
            if (nearClient.exists(key)) {
                continue;
            }
            if (contract && _call.contractId === contract.contractId && _call.methodName in contract) {
                // @ts-ignore
                const res = yield contract[_call.methodName](_call.args);
                nearClient.setQuery(key, { data: res, loading: false, error: undefined });
            }
        }
    });
}
exports.collectNearDataWithoutRender = collectNearDataWithoutRender;
function collectNearData(nearClient, element) {
    return __awaiter(this, void 0, void 0, function* () {
        const render = yield require('react-dom/server').renderToStaticMarkup;
        render(element);
        yield collectNearDataWithoutRender(nearClient);
    });
}
exports.collectNearData = collectNearData;
