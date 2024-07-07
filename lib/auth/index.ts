import axios from 'axios'
import { iInitResponse } from '../init/interface.js'
import { GrantType, iTokenSet } from '../types.js'
import { iAuthService } from './interface.js'

export class AuthService implements iAuthService {
  constructor(private initResponse: iInitResponse) {}

  async logout(accessToken: string, idToken: string, sessionState: string): Promise<void> {
    try {
      const url = await this.initResponse.client.endSessionUrl({
        id_token_hint: idToken,
        state: sessionState,
        client_id: this.initResponse.clientId,
      })

      await this.initResponse.client.revoke(accessToken)
      await axios.get(url)
    } catch(e: any) {
      throw new Error('Error in logging out')
    }
  }

  async refreshToken(refreshToken: string): Promise<iTokenSet> {
    try {
      const newTokenSet = await this.initResponse.client.refresh(refreshToken)

      return {
        accessToken: newTokenSet.access_token,
        refreshToken: newTokenSet.refresh_token,
        expiresIn: newTokenSet.expires_in,
      }
    } catch(e: any) {
      throw new Error('Error in refreshing token')
    }
  }

  async introspect(accessToken: string): Promise<boolean> {
    try {
      const introspectionResponse = await this.initResponse.client.introspect(accessToken)

      if (!introspectionResponse || (introspectionResponse && !introspectionResponse.active)) {
        return false
      }

      return true
    } catch(e: any) {
      throw new Error('Error in token introspection')
    }
  }

  async login(username: string, password: string): Promise<iTokenSet> {
    try {
      const tokenSet = await this.initResponse.client.grant({
        grant_type: this.initResponse.grantType || GrantType.PASSWORD,
        username,
        password,
        scope: 'openid profile email'
      })

      return {
        accessToken: tokenSet.access_token,
        refreshToken: tokenSet.refresh_token,
        expiresIn: tokenSet.expires_in,
        sessionState: tokenSet.session_state,
        idToken: tokenSet.id_token,
      }
    } catch(e: any) {
      throw new Error('Error in logging in')
    }
  }
}