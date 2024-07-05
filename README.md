# openid-simple-auth

###
  openid-simple-auth is an abstraction of openid-client for simple usecase for Node.js applications.

## Exported function and class
- ### initializeConnection
- ### AuthService

## How to use
1. Import initializeConnection and AuthService
2. Pass the connection details in initializeConnection function
3. Create new instance of AuthService and pass the response from initializeConnection function
4. Using the created instance, you can now use login, refreshToken, introspect, and logout functionality

## Example usage with ES Module
```javascript
  import { initializeConnection, AuthService } from 'openid-simple-auth'

  const authConnection = await initializeConnection({
    basePath: `http://0.0.0.0:8080/realms/your-realm/.well-known/openid-configuration`,
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    flow: 'DIRECT_GRANT',
  })

  const authService = new AuthService(authConnection)

  // For login, just pass the username and password
  const tokenSet = await authService.login(username, password)

  // For token introspection, pass the accessToken
  const isValidToken = await authService.introspect(tokenSet.accessToken)

  // For refreshing token, just pass the refreshToken
  const newTokenSet = await authService.refreshToken(tokenSet.refreshToken)

  // For logout
  await authService.logout(newTokenSet.accessToken, tokenSet.idToken, tokenSet.sessionState)
```