
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {

  const jwtToken = verifyToken(event.authorizationToken)
  console.log('User was authorized', jwtToken)


  return {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: '*'
        }
      ]
    }
  }

}


function verifyToken(authHeader: string) {

  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  if (token !== '123')
    throw new Error('invalid token')

}
