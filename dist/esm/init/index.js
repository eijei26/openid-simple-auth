import { Issuer } from 'openid-client';
import { GrantType, SupportedFlow } from '../types';
const init = async (connectionOptions) => {
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
export default init;
