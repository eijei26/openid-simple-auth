import axios from 'axios'
import { Issuer } from 'openid-client'
import { GrantType, iTokenSet, SupportedFlow } from '../types.js'
import { iConnectionOptions, iConnectionService, iInitResponse } from './interface.js'

export class ConnectionService implements iConnectionService {
  private client: any

  constructor (
    private connectionOptions: iConnectionOptions,
  ) {}

  async deleteAdminSession(accessToken: string, idToken: string, sessionState: string): Promise<void> {
    try {
      const url = await this.client.endSessionUrl({
        id_token_hint: idToken,
        state: sessionState,
        client_id: this.connectionOptions.clientId,
      })

      await this.client.revoke(accessToken)
      await axios.get(url)
    } catch(e: any) {
      throw new Error('Error in deleting admin session')
    }
  }

  async getAdminToken(): Promise<iTokenSet> {
    const tokenSet = await this.client.grant({
      grant_type: 'client_credentials',
    })

    return {
      accessToken: tokenSet.access_token,
      expiresIn: tokenSet.expires_in,
      sessionState: tokenSet.session_state,
      idToken: tokenSet.id_token,
    }
  }

  async initialize(): Promise<iInitResponse> {
    let responseTypes: string[] = []
    let grantType: GrantType | null = null

    if (this.connectionOptions.flow === SupportedFlow.DIRECT_GRANT) {
      responseTypes = ['id_token']
      grantType = GrantType.PASSWORD
    }

    const openIdConfigurationPath = this.connectionOptions?.openIdConfigurationPath || `${this.connectionOptions.baseUrl}/realms/${this.connectionOptions.realm}/.well-known/openid-configuration`
    const issuer = await Issuer.discover(openIdConfigurationPath)

    this.client = new issuer.Client({
      client_id: this.connectionOptions.clientId,
      client_secret: this.connectionOptions.clientSecret,
      response_types: responseTypes,
    })

    return {
      issuer,
      client: this.client,
      grantType,
      clientId: this.connectionOptions.clientId,
    }
  } 
}