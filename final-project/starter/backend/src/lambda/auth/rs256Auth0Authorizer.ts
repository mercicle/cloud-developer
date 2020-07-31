
import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJbswQ626FCM1RMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi1hcXltY2xzZS51cy5hdXRoMC5jb20wHhcNMjAwNzA1MTE1NjM0WhcN
MzQwMzE0MTE1NjM0WjAkMSIwIAYDVQQDExlkZXYtYXF5bWNsc2UudXMuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwTyG2Mhcgg0y8AkH
jvIEt+0XhPLEm6uwLo7o807ra4aAf0jKLpfj1A66TaW7AB91rFJYKUpzSYFz14rP
dTYQLHUA92iMmTVCQlzhSsdeZ6XIDdZKQ7oPhaZVaEz8roaEf/qOFD5wXnHy/iX6
vygZHLLMph5qkbq2q7K14kNTlRHYc57C58pVJyAgwkCpvobP83LoBVwIoVulR2Dz
031Wr8h6jecCoR/Qx+cA/2lu0OY3VRuBNPjpoNII5fJK9IGZrfyzwJUtgxxJ3Qij
uGljPHpr5V0sWUI/L8tiP8/SGJYvRwTvnhjmepZdRWtLoUgvc2anda+qYnS5ILpj
Ott9IwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTXkkPj/pot
HZOTMhwEV9ynDUyLZTAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AAHSsY314G0QnImz6NFKNvQea7uS4QhknuvKC+cVe63FdaHGaFhSoQer6YcVPdCU
VNDecNABkotAhUgGlVi4ZOaioSn7yG5mqXz1cVqTZkvBR+xjrXpSZ/QbUkhFtuw7
tFs+EhR45puM+avvR/M9bJJcX7uQ3HAQVU0jxxGcbKd7BvBI27WIWmcDxwa2zkWl
U3gGNML8o2L9raNtygGEWOwqzl/1zjEHuLBKAwwFkrR/LC9OK4F7letIOMWn6b29
aj6okUOcuBGkyA9VH5z+WDhFeugpbJXlAxS+sN5iYT2BFXW4PDRYryJJwBpYsy0I
jgqKkQ8eOtzfDV431q2Fi5U=
-----END CERTIFICATE-----`

export const handler = async (event: CustomAuthorizerEvent): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
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
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader)
    throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
