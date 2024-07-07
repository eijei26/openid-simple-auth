import { BaseClient } from 'openid-client';
import { iTokenSet } from '../types.js';
import { iConnectionOptions, iConnectionService, iInitResponse } from './interface.js';
export declare class ConnectionService implements iConnectionService {
    private connectionOptions;
    private client;
    constructor(connectionOptions: iConnectionOptions, client: BaseClient);
    deleteAdminSession(accessToken: string, idToken: string, sessionState: string): Promise<void>;
    getAdminToken(): Promise<iTokenSet>;
    initialize(): Promise<iInitResponse>;
}
