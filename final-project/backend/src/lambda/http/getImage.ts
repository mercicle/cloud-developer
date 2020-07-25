import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'

import { getImageId } from '../../utils/getIdsFromEvents'
import { getImage } from '../../portsAdaptors/businessLogic';

const STATUS_OK = 200, STATUS_NOT_FOUND = 404

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Caller event', event)
  const imageId = getImageId(event)
  const imageResult = await getImage(imageId)

  if (imageResult.Count !== 0) {
    return { statusCode: STATUS_OK,
             headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
             body: JSON.stringify(imageResult.Items[0])
           }
  }else{
    return { statusCode: STATUS_NOT_FOUND,
             headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
             body: ''
           }
  }

}
