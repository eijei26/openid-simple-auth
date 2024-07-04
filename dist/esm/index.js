import { Issuer } from 'openid-client';
import fetch from 'node-fetch';
var SupportedFlow;
(function (SupportedFlow) {
    SupportedFlow["DIRECT_GRANT"] = "DIRECT_GRANT";
})(SupportedFlow || (SupportedFlow = {}));
var GrantType;
(function (GrantType) {
    GrantType["PASSWORD"] = "password";
})(GrantType || (GrantType = {}));
export const init = async (connectionOptions) => {
    let responseTypes = [];
    let grantType = null;
    if (connectionOptions.flow === SupportedFlow.DIRECT_GRANT) {
        responseTypes = ['id_token'];
        grantType = GrantType.PASSWORD;
    }
    const issuer = await Issuer.discover(connectionOptions.basePath);
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
};
export class OidcService {
    oidcConnect;
    constructor(oidcConnect) {
        this.oidcConnect = oidcConnect;
        this.oidcConnect = oidcConnect;
    }
    async logout(accessToken, idToken, sessionState) {
        try {
            const url = await this.oidcConnect.client.endSessionUrl({
                id_token_hint: idToken,
                state: sessionState,
                client_id: this.oidcConnect.clientId,
            });
            await this.oidcConnect.client.revoke(accessToken);
            await fetch(url);
        }
        catch (e) {
            throw new Error('Error in logging out');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const newTokenSet = await this.oidcConnect.client.refresh(refreshToken);
            return {
                accessToken: newTokenSet.access_token,
                refreshToken: newTokenSet.refresh_token,
                expiresIn: newTokenSet.expires_in,
            };
        }
        catch (e) {
            throw new Error('Error in refreshing token');
        }
    }
    async introspect(accessToken) {
        try {
            const introspectionResponse = await this.oidcConnect.client.introspect(accessToken);
            if (!introspectionResponse || (introspectionResponse && !introspectionResponse.active)) {
                return false;
            }
            return true;
        }
        catch (e) {
            throw new Error('Error in token introspection');
        }
    }
    async login(username, password) {
        try {
            const tokenSet = await this.oidcConnect.client.grant({
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
    }
}
