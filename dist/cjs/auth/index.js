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
exports.AuthService = void 0;
const axios_1 = __importDefault(require("axios"));
const types_js_1 = require("../types.js");
class AuthService {
    constructor(initResponse) {
        this.initResponse = initResponse;
    }
    logout(accessToken, idToken, sessionState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield this.initResponse.client.endSessionUrl({
                    id_token_hint: idToken,
                    state: sessionState,
                    client_id: this.initResponse.clientId,
                });
                yield this.initResponse.client.revoke(accessToken);
                yield axios_1.default.get(url);
            }
            catch (e) {
                throw new Error('Error in logging out');
            }
        });
    }
    refreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTokenSet = yield this.initResponse.client.refresh(refreshToken);
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
                const introspectionResponse = yield this.initResponse.client.introspect(accessToken);
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
                const tokenSet = yield this.initResponse.client.grant({
                    grant_type: this.initResponse.grantType || types_js_1.GrantType.PASSWORD,
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
exports.AuthService = AuthService;
