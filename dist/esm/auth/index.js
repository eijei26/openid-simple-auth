import axios from 'axios';
import { GrantType } from '../types';
class AuthService {
    initResponse;
    constructor(initResponse) {
        this.initResponse = initResponse;
        this.initResponse = initResponse;
    }
    async logout(accessToken, idToken, sessionState) {
        try {
            const url = await this.initResponse.client.endSessionUrl({
                id_token_hint: idToken,
                state: sessionState,
                client_id: this.initResponse.clientId,
            });
            await this.initResponse.client.revoke(accessToken);
            await axios.get(url);
        }
        catch (e) {
            throw new Error('Error in logging out');
        }
    }
    async refreshToken(refreshToken) {
        try {
            const newTokenSet = await this.initResponse.client.refresh(refreshToken);
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
            const introspectionResponse = await this.initResponse.client.introspect(accessToken);
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
            const tokenSet = await this.initResponse.client.grant({
                grant_type: this.initResponse.grantType || GrantType.PASSWORD,
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
export default AuthService;
