import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { getUserId } from '../utils'
import { updateTodoUrl } from '../../businessLogic/todo'

const STATUS_CREATED = 201

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoID  = event.pathParameters.todoId
  const userID = getUserId(event)

  const urlObject = await updateTodoUrl(userID, todoID)

  return { statusCode: STATUS_CREATED,
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
            body: JSON.stringify(urlObject)
         }
}

// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//
//   const todoID  = event.pathParameters.todoId
//   const userID = getUserId(event)
//
//   console.log(`Getting Signed URL for TODO ID: ${todoID}`)
//
//   const imageID = uuid.v4()
//   const imageURL = `https://${BUCKET_NAME}.s3.amazonaws.com/${imageID}`
//   const signedURL = s3.getSignedUrl('putObject',{ Bucket: BUCKET_NAME, Key: imageID, Expires: URL_EXPIRE_INT })
//
//   const dynamoQuery = {
//           TableName: TODOS_TABLE,
//           IndexName: INDEX_NAME,
//           Key: { todoId: todoID , userId: userID},
//           UpdateExpression: "set attachmentUrl = :a",
//           ExpressionAttributeValues:{":a": imageURL},
//           ReturnValues:"UPDATED_NEW"
//   }
//
//   await dynamoDocClient.update(dynamoQuery).promise()
//
//   return { statusCode: STATUS_CREATED,
//             headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
//             body: JSON.stringify({ imageUrl: imageURL, uploadUrl: signedURL})
//          }
// }
