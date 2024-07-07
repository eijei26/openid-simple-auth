export interface iUserService {
    registerUser(userDetails: any, config?: iAdminApiConfig): Promise<any>;
    getUser(userId: any, config?: iAdminApiConfig): Promise<any>;
    updateUser(userId: any, userDetails: any, config?: iAdminApiConfig): Promise<any>;
    deleteUser(userId: any, config?: iAdminApiConfig): Promise<any>;
}
export interface iAdminApiConfig {
    url?: string;
    headers?: any;
}
