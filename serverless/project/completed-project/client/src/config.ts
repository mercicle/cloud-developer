// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '7og2ynlrmd'
const region = 'us-east-2'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-aqymclse.us.auth0.com', // Auth0 domain
  clientId: 'JHOBTfVDX5CfUfukZshwyqa5gpiRBNEO',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
