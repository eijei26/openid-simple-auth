import { iConnectionOptions } from '../init/interface.js';
import { iAdminApiConfig, iUserService } from './interface.js';
export declare class UserService implements iUserService {
    private connectionOptions;
    private adminAccessToken;
    private defaultHeaders;
    constructor(connectionOptions: iConnectionOptions, adminAccessToken: string);
    registerUser(userDetails: any, config?: iAdminApiConfig): Promise<any>;
    getUser(userId: any, config?: iAdminApiConfig): Promise<any>;
    updateUser(userId: any, userDetails: any, config?: iAdminApiConfig): Promise<any>;
    deleteUser(userId: any, config?: iAdminApiConfig): Promise<any>;
}
