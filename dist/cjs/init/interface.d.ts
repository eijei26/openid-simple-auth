import { BaseClient, Issuer } from 'openid-client';
import { SupportedFlow, GrantType, iTokenSet } from '../types.js';
export interface iInitResponse {
    issuer: Issuer<BaseClient>;
    client: BaseClient;
    grantType: GrantType | null;
    clientId: string;
}
export interface iConnectionOptions {
    openIdConfigurationPath: string;
    baseUrl: string;
    clientId: string;
    clientSecret: string;
    flow: SupportedFlow;
    realm?: string;
}
export interface iConnectionService {
    initialize(): Promise<iInitResponse>;
    getAdminToken(): Promise<iTokenSet>;
    deleteAdminSession(accessToken: string, idToken: string, sessionState: string): Promise<void>;
}
