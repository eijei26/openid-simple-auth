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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OidcService = exports.init = void 0;
const openid_client_1 = require("openid-client");
const node_fetch_1 = __importDefault(require("node-fetch"));
var SupportedFlow;
(function (SupportedFlow) {
    SupportedFlow["DIRECT_GRANT"] = "DIRECT_GRANT";
})(SupportedFlow || (SupportedFlow = {}));
var GrantType;
(function (GrantType) {
    GrantType["PASSWORD"] = "password";
})(GrantType || (GrantType = {}));
const init = (connectionOptions) => __awaiter(void 0, void 0, void 0, function* () {
    let responseTypes = [];
    let grantType = null;
    if (connectionOptions.flow === SupportedFlow.DIRECT_GRANT) {
        responseTypes = ['id_token'];
        grantType = GrantType.PASSWORD;
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
exports.init = init;
class OidcService {
    constructor(oidcConnect) {
        this.oidcConnect = oidcConnect;
        this.oidcConnect = oidcConnect;
    }
    logout(accessToken, idToken, sessionState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield this.oidcConnect.client.endSessionUrl({
                    id_token_hint: idToken,
                    state: sessionState,
                    client_id: this.oidcConnect.clientId,
                });
                yield this.oidcConnect.client.revoke(accessToken);
                yield (0, node_fetch_1.default)(url);
            }
            catch (e) {
                throw new Error('Error in logging out');
            }
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTokenSet = yield this.oidcConnect.client.refresh(refreshToken);
                return {
                    accessToken: newTokenSet.access_token,
                    refreshToken: newTokenSet.refresh_token,
                    expiresIn: newTokenSet.expires_in,
                };
            }
            catch (e) {
                throw new Error('Error in refreshing token');
            }
        });
    }
    introspect(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const introspectionResponse = yield this.oidcConnect.client.introspect(accessToken);
                if (!introspectionResponse || (introspectionResponse && !introspectionResponse.active)) {
                    return false;
                }
                return true;
            }
            catch (e) {
                throw new Error('Error in token introspection');
            }
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenSet = yield this.oidcConnect.client.grant({
                    grant_type: this.oidcConnect.grantType || GrantType.PASSWORD,
                    username,
                    password,
                    scope: 'openid profile email'
                });
                return {
                    accessToken: tokenSet.access_token,
                    refreshToken: tokenSet.refresh_token,
                    expiresIn: tokenSet.expires_in,
                    sessionState: tokenSet.session_state,
                    idToken: tokenSet.id_token,
                };
            }
            catch (e) {
                throw new Error('Error in logging in');
            }
        });
    }
}
exports.OidcService = OidcService;
