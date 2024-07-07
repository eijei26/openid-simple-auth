# openid-simple-auth

###
  openid-simple-auth is an abstraction of openid-client for simple usecase for Node.js applications. Tested in keycloak.

## How to use
1. Import AuthService, ConnectionService, UserService
2. Create instance of connection service by passing connection options
3. Create new instance of AuthService and pass the response from ConnectionService.initialize function
4. Using the created AuthService instance, you can now use login, refreshToken, introspect, and logout functionality
5. To perform admin service like creating a user, updating, and getting user information, you need to get admin token first
6. To get an admin token, call the ConnectionService.getAdminToken function
7. Create an instance of user service by passing connection options and the admin token
8. Using the UserService instance, you can now create, get, delete, update a user.

## Example usage with ES Module
```javascript
  import { AuthService, ConnectionService, UserService } from 'openid-simple-auth'

  const connectionOptions = {
    baseUrl: 'your-domain',
    realm: 'your-realm',
    clientId: 'your-app-client-id',
    clientSecret: 'your-app-client-secret',
    flow: 'DIRECT_GRANT', // Only Direct Grant is supported for now
  }

  const connectionService = new ConnectionService(connectionOptions)
  const adminToken = await connectionService.getAdminToken()
  const connection = await connectionService.initialize()

  const authService = new AuthService(connection)
  const userService = new UserService(connectionOptions, adminToken.accessToken)

  // For user registration
  const userDetails = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    enabled: true,
    credentials: [
      {
        type: 'password',
        value: req.body.password,
        temporary: false
      }
    ]
  }

  const registeredUser = await userService.registerUser(userDetails)

  // For login, just pass the username and password
  const tokenSet = await authService.login(username, password)

  // For token introspection, pass the accessToken
  const isValidToken = await authService.introspect(tokenSet.accessToken)

  // For refreshing token, just pass the refreshToken
  const newTokenSet = await authService.refreshToken(tokenSet.refreshToken)

  // For logout
  await authService.logout(newTokenSet.accessToken, tokenSet.idToken, tokenSet.sessionState)
```