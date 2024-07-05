import { iInitResponse } from '../init/interface';
import { iTokenSet } from '../types';
import { iAuthService } from './interface';
declare class AuthService implements iAuthService {
    private initResponse;
    constructor(initResponse: iInitResponse);
    logout(accessToken: string, idToken: string, sessionState: string): Promise<void>;
    refreshToken(refreshToken: string): Promise<iTokenSet>;
    introspect(accessToken: string): Promise<boolean>;
    login(username: string, password: string): Promise<iTokenSet>;
}
export default AuthService;
