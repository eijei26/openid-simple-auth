import axios from 'axios';
import { Issuer } from 'openid-client';
import { GrantType, SupportedFlow } from '../types.js';
export class ConnectionService {
    connectionOptions;
    client;
    constructor(connectionOptions) {
        this.connectionOptions = connectionOptions;
    }
    async deleteAdminSession(accessToken, idToken, sessionState) {
        try {
            const url = await this.client.endSessionUrl({
                id_token_hint: idToken,
                state: sessionState,
                client_id: this.connectionOptions.clientId,
            });
            await this.client.revoke(accessToken);
            await axios.get(url);
        }
        catch (e) {
            throw new Error('Error in deleting admin session');
        }
    }
    async getAdminToken() {
        const tokenSet = await this.client.grant({
            grant_type: 'client_credentials',
        });
        return {
            accessToken: tokenSet.access_token,
            expiresIn: tokenSet.expires_in,
            sessionState: tokenSet.session_state,
            idToken: tokenSet.id_token,
        };
    }
    async initialize() {
        let responseTypes = [];
        let grantType = null;
        if (this.connectionOptions.flow === SupportedFlow.DIRECT_GRANT) {
            responseTypes = ['id_token'];
            grantType = GrantType.PASSWORD;
        }
        const openIdConfigurationPath = this.connectionOptions?.openIdConfigurationPath || `${this.connectionOptions.baseUrl}/realms/${this.connectionOptions.realm}/.well-known/openid-configuration`;
        const issuer = await Issuer.discover(openIdConfigurationPath);
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
    }
}
