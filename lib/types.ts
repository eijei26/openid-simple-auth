export enum SupportedFlow {
  DIRECT_GRANT = 'DIRECT_GRANT'
}

export enum GrantType {
  PASSWORD = 'password'
}

export interface iTokenSet {
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
  sessionState?: string
  idToken?: string
}

export interface iCreatedUser {
  
}