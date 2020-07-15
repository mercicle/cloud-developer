import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import * as AWS from 'aws-sdk'
import * as uuid from 'uuid'

const todosTable = process.env.TODOS_TABLE
const bucketName = process.env.TODO_IMAGES_S3_BUCKET
const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)

const docClient = new AWS.DynamoDB.DocumentClient()
const s3 = new AWS.S3({signatureVersion: 'v4'})
const STATUS_CREATED = 201


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoID  = event.pathParameters.todoId
  console.log(`Getting Signed URL for TODO ID: ${todoID}`)

  const imageID = uuid.v4()
  const imageURL = `https://${bucketName}.s3.amazonaws.com/${imageID}`
  const signedURL = s3.getSignedUrl('putObject',{ Bucket: bucketName, Key: imageID, Expires: urlExpiration })

  const updateUrlObject = {
          TableName: todosTable,
          Key: { "todoId": todoID },
          UpdateExpression: "set attachmentUrl = :a",
          ExpressionAttributeValues:{":a": imageURL},
          ReturnValues:"UPDATED_NEW"
  }

  await docClient.update(updateUrlObject).promise()

  return { statusCode: STATUS_CREATED,
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
            body: JSON.stringify({ imageUrl: imageURL, uploadUrl: signedURL})
         }
}
