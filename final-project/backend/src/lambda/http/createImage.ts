
import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

import { getGroupId } from '../../utils/getIdsFromEvents'
import { groupExists, createImage } from '../../portsAdaptors/businessLogic'
import { CreateImageRequest } from '../../models/Models'

const STATUS_CREATED = 201, STATUS_NOT_FOUND = 404

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const eventJSONString = JSON.parse(event.body)
  console.log(`Creating Image event: ${eventJSONString}`)

  const groupId = getGroupId(event)
  const isValidGroup = await groupExists(groupId)

  if (!isValidGroup) {
    return { statusCode: STATUS_NOT_FOUND,
             body: JSON.stringify({ error: 'Group does not exist'})
           }
  }

  const newImage: CreateImageRequest = JSON.parse(event.body)

  const newItem = await createImage(newImage, groupId)

  return { statusCode: STATUS_CREATED,
           headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
           body: JSON.stringify({newItem: newItem, uploadUrl: newItem.uploadUrl})
         }
}
