import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'
import { getUserId } from '../utils'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3({signatureVersion: 'v4'})
const STATUS_CREATED = 201
const TODOS_TABLE = process.env.TODOS_TABLE
const INDEX_NAME = process.env.INDEX_NAME
const BUCKET_NAME = process.env.TODO_IMAGES_S3_BUCKET
const URL_EXPIRE_INT = parseInt(process.env.SIGNED_URL_EXPIRATION)


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoID  = event.pathParameters.todoId
  const userID = getUserId(event)

  console.log(`Getting Signed URL for TODO ID: ${todoID}`)

  const imageID = uuid.v4()
  const imageURL = `https://${BUCKET_NAME}.s3.amazonaws.com/${imageID}`
  const signedURL = s3.getSignedUrl('putObject',{ Bucket: BUCKET_NAME, Key: imageID, Expires: URL_EXPIRE_INT })

  const dynamoQuery = {
          TableName: TODOS_TABLE,
          IndexName: INDEX_NAME,
          Key: { todoId: todoID , userId: userID},
          UpdateExpression: "set attachmentUrl = :a",
          ExpressionAttributeValues:{":a": imageURL},
          ReturnValues:"UPDATED_NEW"
  }

  await dynamoDocClient.update(dynamoQuery).promise()

  return { statusCode: STATUS_CREATED,
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
            body: JSON.stringify({ imageUrl: imageURL, uploadUrl: signedURL})
         }
}
