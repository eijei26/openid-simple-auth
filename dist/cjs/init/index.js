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
const openid_client_1 = require("openid-client");
const types_js_1 = require("../types.js");
const init = (connectionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let responseTypes = [];
    let grantType = null;
    if (connectionOptions.flow === types_js_1.SupportedFlow.DIRECT_GRANT) {
        responseTypes = ['id_token'];
        grantType = types_js_1.GrantType.PASSWORD;
    }
    const issuer = yield openid_client_1.Issuer.discover(connectionOptions.basePath);
    const client = new issuer.Client({
        client_id: connectionOptions.clientId,
        client_secret: connectionOptions.clientSecret,
        response_types: responseTypes,
    });
    return {
        issuer,
        client,
        grantType,
        clientId: connectionOptions.clientId,
    };
});
exports.default = init;
