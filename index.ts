import { BaseClient, Issuer } from 'openid-client'
import fetch from 'node-fetch'

enum SupportedFlow {
  DIRECT_GRANT = 'DIRECT_GRANT'
}

enum GrantType {
  PASSWORD = 'password'
}

export interface iConnectionOptions {
  basePath: string
  clientId: string
  clientSecret: string
  flow: SupportedFlow
}

interface iOidcConnect {
  issuer: Issuer<BaseClient>,
  client: BaseClient,
  grantType: GrantType | null
  clientId: string
}

export const init = async (connectionOptions: iConnectionOptions): Promise<iOidcConnect> => {
  let responseTypes: string[] = []
  let grantType = null

  if (connectionOptions.flow === SupportedFlow.DIRECT_GRANT) {
    responseTypes = ['id_token']
    grantType = GrantType.PASSWORD
  }

  const issuer = await Issuer.discover(connectionOptions.basePath)

  const client = new issuer.Client({
    client_id: connectionOptions.clientId,
    client_secret: connectionOptions.clientSecret,
    response_types: responseTypes,
  })

  return {
    issuer,
    client,
    grantType,
    clientId: connectionOptions.clientId,
  }
}

interface iOidcTokenSet {
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  sessionState?: string
  idToken?: string
}

interface iOidcService {
  login(username: string, password: string): Promise<iOidcTokenSet>
  introspect(accessToken: string): Promise<boolean>
  refreshToken(refreshToken: string): Promise<iOidcTokenSet>
  logout(accessToken: string, idToken: string, sessionState: string): Promise<void>
}

export class OidcService implements iOidcService {
  constructor(private oidcConnect: iOidcConnect) {
    this.oidcConnect = oidcConnect
  }

  async logout(accessToken: string, idToken: string, sessionState: string): Promise<void> {
    try {
      const url = await this.oidcConnect.client.endSessionUrl({
        id_token_hint: idToken,
        state: sessionState,
        client_id: this.oidcConnect.clientId,
      })

      await this.oidcConnect.client.revoke(accessToken)
      await fetch(url)
    } catch(e: any) {
      throw new Error('Error in logging out')
    }
  }

  async refreshToken(refreshToken: string): Promise<iOidcTokenSet> {
    try {
      const newTokenSet = await this.oidcConnect.client.refresh(refreshToken)

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
      const introspectionResponse = await this.oidcConnect.client.introspect(accessToken)

      if (!introspectionResponse || (introspectionResponse && !introspectionResponse.active)) {
        return false
      }

      return true
    } catch(e: any) {
      throw new Error('Error in token introspection')
    }
  }

  async login(username: string, password: string): Promise<iOidcTokenSet> {
    try {
      const tokenSet = await this.oidcConnect.client.grant({
        grant_type: this.oidcConnect.grantType || GrantType.PASSWORD,
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