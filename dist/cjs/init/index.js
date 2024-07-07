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
exports.ConnectionService = void 0;
const axios_1 = __importDefault(require("axios"));
const openid_client_1 = require("openid-client");
const types_js_1 = require("../types.js");
class ConnectionService {
    constructor(connectionOptions, client) {
        this.connectionOptions = connectionOptions;
        this.client = client;
        this.client = client;
    }
    deleteAdminSession(accessToken, idToken, sessionState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = yield this.client.endSessionUrl({
                    id_token_hint: idToken,
                    state: sessionState,
                    client_id: this.connectionOptions.clientId,
                });
                yield this.client.revoke(accessToken);
                yield axios_1.default.get(url);
            }
            catch (e) {
                throw new Error('Error in deleting admin session');
            }
        });
    }
    getAdminToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenSet = yield this.client.grant({
                grant_type: 'client_credentials',
            });
            return {
                accessToken: tokenSet.access_token,
                expiresIn: tokenSet.expires_in,
                sessionState: tokenSet.session_state,
                idToken: tokenSet.id_token,
            };
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let responseTypes = [];
            let grantType = null;
            if (this.connectionOptions.flow === types_js_1.SupportedFlow.DIRECT_GRANT) {
                responseTypes = ['id_token'];
                grantType = types_js_1.GrantType.PASSWORD;
            }
            const openIdConfigurationPath = ((_a = this.connectionOptions) === null || _a === void 0 ? void 0 : _a.openIdConfigurationPath) || `${this.connectionOptions.baseUrl}/realms/${this.connectionOptions.realm}/.well-known/openid-configuration`;
            const issuer = yield openid_client_1.Issuer.discover(openIdConfigurationPath);
            this.client = new issuer.Client({
                client_id: this.connectionOptions.clientId,
                client_secret: this.connectionOptions.clientSecret,
                response_types: responseTypes,
            });
            return {
                issuer,
                client: this.client,
                grantType,
                clientId: this.connectionOptions.clientId,
            };
        });
    }
}
exports.ConnectionService = ConnectionService;
