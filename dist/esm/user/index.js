import axios from 'axios';
export class UserService {
    connectionOptions;
    adminAccessToken;
    defaultHeaders;
    constructor(connectionOptions, adminAccessToken) {
        this.connectionOptions = connectionOptions;
        this.adminAccessToken = adminAccessToken;
        this.defaultHeaders = {
            'Authorization': `Bearer ${this.adminAccessToken}`,
            'Content-Type': 'application/json'
        };
    }
    async registerUser(userDetails, config) {
        try {
            const registrationUrl = config?.url || `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users`;
            const headers = config?.headers || this.defaultHeaders;
            const response = await axios.post(registrationUrl, userDetails, {
                headers,
            });
            return response.data;
        }
        catch (e) {
            console.error(e);
            throw new Error('Error in registering a user');
        }
    }
    async getUser(userId, config) {
        try {
            const getUserUrl = config?.url || `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`;
            const headers = config?.headers || this.defaultHeaders;
            const response = await axios.get(getUserUrl, {
                headers,
            });
            return response.data;
        }
        catch (e) {
            console.error(e);
            throw new Error('Error in getting user details');
        }
    }
    async updateUser(userId, userDetails, config) {
        try {
            const updateUserUrl = `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`;
            const headers = config?.headers || this.defaultHeaders;
            const response = await axios.put(updateUserUrl, userDetails, {
                headers,
            });
            return response.data;
        }
        catch (e) {
            console.error(e);
            throw new Error('Error in updating a user');
        }
    }
    async deleteUser(userId, config) {
        try {
            const updateUserUrl = `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`;
            const headers = config?.headers || this.defaultHeaders;
            const response = await axios.delete(updateUserUrl, {
                headers,
            });
            return response.data;
        }
        catch (e) {
            console.error(e);
            throw new Error('Error in updating a user');
        }
    }
}
