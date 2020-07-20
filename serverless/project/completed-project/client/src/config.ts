const apiId = 'u1rqkgc0x4'
const region = 'us-east-2'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-aqymclse.us.auth0.com',
  clientId: 'JHOBTfVDX5CfUfukZshwyqa5gpiRBNEO',
  callbackUrl: 'http://localhost:3000/callback',
  returnTo:  'http://localhost:3000'
}
