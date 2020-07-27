const apiId = 'vvmqjunhnj'
const region = 'us-east-2'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-aqymclse.us.auth0.com',
  clientId: 'tGQeMM5L1qHMeRDa4c55OayQKSC8SAjS',
  callbackUrl: 'http://localhost:3000/callback',
  returnTo:  'http://localhost:3000'
}
