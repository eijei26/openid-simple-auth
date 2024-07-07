import axios from 'axios'
import { iConnectionOptions } from '../init/interface.js'
import { iAdminApiConfig, iUserService } from './interface.js'

export class UserService implements iUserService {
  private defaultHeaders: any

  constructor(private connectionOptions: iConnectionOptions, private adminAccessToken: string) {
    this.defaultHeaders = {
      'Authorization': `Bearer ${this.adminAccessToken}`,
      'Content-Type': 'application/json'
    }
  }

  async registerUser(userDetails: any, config?: iAdminApiConfig): Promise<any> {
    try {
      const registrationUrl = config?.url || `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users`
      const headers = config?.headers || this.defaultHeaders
      const response = await axios.post(registrationUrl, userDetails, {
        headers,
      })

      return response.data
    } catch(e: any) {
      console.error(e)
      throw new Error('Error in registering a user')
    }
  }

  async getUser(userId: any, config?: iAdminApiConfig): Promise<any> {
    try {
      const getUserUrl = config?.url || `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`
      const headers = config?.headers || this.defaultHeaders
      const response = await axios.get(getUserUrl, {
        headers,
      })

      return response.data
    } catch(e: any) {
      console.error(e)
      throw new Error('Error in getting user details')
    }
  }

  async updateUser(userId: any, userDetails: any, config?: iAdminApiConfig): Promise<any> {
    try {
      const updateUserUrl = `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`
      const headers = config?.headers || this.defaultHeaders
      const response = await axios.put(updateUserUrl, userDetails, {
        headers,
      })

      return response.data
    } catch(e: any) {
      console.error(e)
      throw new Error('Error in updating a user')
    }
  }

  async deleteUser(userId: any, config?: iAdminApiConfig): Promise<any> {
    try {
      const updateUserUrl = `${this.connectionOptions.baseUrl}/admin/realms/${this.connectionOptions.realm}/users/${userId}`
      const headers = config?.headers || this.defaultHeaders
      const response = await axios.delete(updateUserUrl, {
        headers,
      })

      return response.data
    } catch(e: any) {
      console.error(e)
      throw new Error('Error in updating a user')
    }
  }
}