import { Issuer } from 'openid-client'
import { GrantType, SupportedFlow } from '../types'
import { iConnectionOptions, iInitResponse } from './interface'

const init = async (connectionOptions: iConnectionOptions): Promise<iInitResponse> => {
  let responseTypes: string[] = []
  let grantType: GrantType | null = null

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

export default init