import { iTokenSet } from '../types'

export interface iAuthService {
  login(username: string, password: string): Promise<iTokenSet>
  introspect(accessToken: string): Promise<boolean>
  refreshToken(refreshToken: string): Promise<iTokenSet>
  logout(accessToken: string, idToken: string, sessionState: string): Promise<void>
}