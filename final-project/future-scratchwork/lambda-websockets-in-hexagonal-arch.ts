
//////////////////////////////////////
//////////      Connect       ////////
//////////////////////////////////////

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { getConnectionId } from '../../utils/getIdsFromEvents'
import { saveConnection } from '../../portsAdaptors/businessLogic';

const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Websocket connect', event)

  const connectionId = getConnectionId(event)

  await saveConnection(connectionId)

  return { statusCode: STATUS_OK,
           body: ''
         }
}

// business layer
export async function saveConnection(key: string): Promise<any> {
  return await dataAccess.saveConnection(key)
}

//data layer
const connectionsTable = process.env.CONNECTIONS_TABLE
async saveConnection(connectionId: string){

  const timestamp = new Date().toISOString()

  const item = { id: connectionId, timestamp }

  console.log('Storing Connection: ', item)

  await this.docClient.put({ TableName: this.connectionsTable, Item: item }).promise()

}


//////////////////////////////////////
/////////Remove Connection ///////////
//////////////////////////////////////

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { getConnectionId } from '../../utils/getIdsFromEvents'
import { removeConnection } from '../../portsAdaptors/businessLogic';

const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Websocket disconnect', event)

  const connectionId = getConnectionId(event)

  const key = { id: connectionId }

  console.log('Removing item with key: ', key)

  await docClient.delete({ TableName: connectionsTable, Key: key }).promise()

  return { statusCode: STATUS_OK,
           body: ''
         }
}

// business layer
export async function removeConnection(key: string): Promise<any> {
  return await dataAccess.removeConnection(key)
}

// data layer
const connectionsTable = process.env.CONNECTIONS_TABLE
async removeConnection(connectionId: string){

    const key = { id: connectionId }
    console.log('Removing item with key: ', key)
    await this.docClient.delete({ TableName: this.connectionsTable, Key: key }).promise()

}
