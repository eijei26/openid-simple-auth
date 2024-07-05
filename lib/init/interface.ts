import { BaseClient, Issuer } from 'openid-client'
import { SupportedFlow, GrantType } from '../types.js'

export interface iInitResponse {
  issuer: Issuer<BaseClient>,
  client: BaseClient,
  grantType: GrantType | null
  clientId: string
}

export interface iConnectionOptions {
  basePath: string
  clientId: string
  clientSecret: string
  flow: SupportedFlow
}