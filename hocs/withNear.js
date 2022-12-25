"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const index_1 = require("../index");
function withNear(AppComponent, { defaultEnvironment = index_1.NearEnvironment.TestNet, environmentProps = {}, providerProps = {}, authContractId, }) {
    const Wrapper = (appProps) => {
        return (react_1.default.createElement(index_1.NearEnvironmentProvider, Object.assign({}, environmentProps, { defaultEnvironment: defaultEnvironment }),
            react_1.default.createElement(index_1.NearProvider, Object.assign({}, providerProps, { authContractId: authContractId }),
                react_1.default.createElement(AppComponent, Object.assign({}, appProps)))));
    };
    if (AppComponent.getInitialProps) {
        Wrapper.getInitialProps = AppComponent.getInitialProps;
    }
    return Wrapper;
}
exports.default = withNear;
