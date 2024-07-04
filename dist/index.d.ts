import { BaseClient, Issuer } from 'openid-client';
declare enum SupportedFlow {
    DIRECT_GRANT = "DIRECT_GRANT"
}
declare enum GrantType {
    PASSWORD = "password"
}
export interface iConnectionOptions {
    basePath: string;
    clientId: string;
    clientSecret: string;
    flow: SupportedFlow;
}
interface iOidcConnect {
    issuer: Issuer<BaseClient>;
    client: BaseClient;
    grantType: GrantType | null;
    clientId: string;
}
export declare const init: (connectionOptions: iConnectionOptions) => Promise<iOidcConnect>;
interface iOidcTokenSet {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
    sessionState?: string;
    idToken?: string;
}
interface iOidcService {
    login(username: string, password: string): Promise<iOidcTokenSet>;
    introspect(accessToken: string): Promise<boolean>;
    refreshToken(refreshToken: string): Promise<iOidcTokenSet>;
    logout(accessToken: string, idToken: string, sessionState: string): Promise<void>;
}
export declare class OidcService implements iOidcService {
    private oidcConnect;
    constructor(oidcConnect: iOidcConnect);
    logout(accessToken: string, idToken: string, sessionState: string): Promise<void>;
    refreshToken(refreshToken: string): Promise<iOidcTokenSet>;
    introspect(accessToken: string): Promise<boolean>;
    login(username: string, password: string): Promise<iOidcTokenSet>;
}
export {};
