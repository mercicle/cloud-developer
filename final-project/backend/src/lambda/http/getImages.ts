import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

const STATUS_OK = 200, STATUS_NOT_FOUND = 404

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const groupId = getGroupId(event)
  const validGroupId = await groupExists(groupId)

  if (!validGroupId) {
    return { statusCode: STATUS_NOT_FOUND,
             headers: {'Access-Control-Allow-Origin': '*'},
             body: JSON.stringify({ error: 'Group does not exist'})
    }
  }

  const images = await getImagesOfGroup(groupId)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items: images
    })
  }
}

async function groupExists(groupId: string) {
  const result = await docClient
    .get({
      TableName: groupsTable,
      Key: {
        id: groupId
      }
    })
    .promise()

  console.log('Get group: ', result)
  return !!result.Item
}

async function getImagesPerGroup(groupId: string) {

}
