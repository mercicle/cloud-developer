
import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getGroupId } from '../../utils/getIdsFromEvents'

import { groupExists, getImagesOfGroup } from '../../portsAdaptors/businessLogic'

const STATUS_OK = 200, STATUS_NOT_FOUND = 404

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const groupId = getGroupId(event)
  const validGroupId = await groupExists(groupId)

  if (!validGroupId) {
    return { statusCode: STATUS_NOT_FOUND,
             headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
             body: JSON.stringify({ error: 'Group does not exist'})
    }
  }

  const images = await getImagesOfGroup(groupId)

  return { statusCode: STATUS_OK,
            headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
            body: JSON.stringify({ items: images })
          }

}
