"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const near_api_js_1 = require("near-api-js");
const wallet_1 = __importDefault(require("../core/wallet"));
const NearProvider_1 = require("../NearProvider");
const client_1 = require("../core/client");
function useNearContract(contractId, contractMethods) {
    const { client } = react_1.default.useContext(NearProvider_1.NearContext);
    const wallet = (0, wallet_1.default)();
    const contract = react_1.default.useMemo(() => {
        if (wallet) {
            const walletAccount = wallet.account();
            const requestId = (0, client_1.encodeRequest)(contractId, '_', Object.assign({ accountId: walletAccount.accountId }, contractMethods));
            const cacheState = client.cache.get(requestId, 'ROOT_CONTRACT');
            if (cacheState) {
                return cacheState;
            }
            const contr = new near_api_js_1.Contract(walletAccount, contractId, contractMethods);
            client.cache.set(requestId, contr, 'ROOT_CONTRACT');
            return contr;
        }
        return null;
    }, [wallet]);
    return wallet ? contract : null;
}
exports.default = useNearContract;
