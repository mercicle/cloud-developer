const apiId = '5ewys75bhk'
const region = 'us-east-2'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-xbcxqezj.us.auth0.com',
  clientId: '45LO7ENwzQX8vl1Vh7ciZoju1dYjQuH6',
  callbackUrl: 'http://localhost:3000/callback',
  returnTo:  'http://localhost:3000'
}
