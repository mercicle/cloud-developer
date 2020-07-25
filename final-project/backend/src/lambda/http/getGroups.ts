
import 'source-map-support/register'
import { getAllGroups } from '../../portsAdaptors/businessLogic';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Getting groups ', event)
  const groups = await getAllGroups()

  return {statusCode: STATUS_OK,
          headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
          body: JSON.stringify({ groups })
        }
}
