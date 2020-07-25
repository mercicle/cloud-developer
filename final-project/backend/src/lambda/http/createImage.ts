
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
    return { statusCode: STATUS_NOT_FOUND,body: JSON.stringify({ error: 'Group does not exist'})}
  }

  const newImage: CreateImageRequest = JSON.parse(event.body)

  const newItem = await createImage(newImage, groupId)

  return { statusCode: STATUS_CREATED,
           headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
           body: JSON.stringify({newItem: newItem, uploadUrl: newItem.uploadUrl})
         }
}


// import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import 'source-map-support/register'
// import * as AWS  from 'aws-sdk'
// import * as uuid from 'uuid'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'
// const AWSXRay = require('aws-xray-sdk')
//
// const XAWS = AWSXRay.captureAWS(AWS)
//
// const docClient = new XAWS.DynamoDB.DocumentClient()
// const s3 = new XAWS.S3({
//   signatureVersion: 'v4'
// })
//
// const groupsTable = process.env.GROUPS_TABLE
// const imagesTable = process.env.IMAGES_TABLE
// const bucketName = process.env.IMAGES_S3_BUCKET
// const urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
//
// export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//
//   console.log('Caller event', event)
//   const groupId = getGroupId(event)
//   const validGroupId = await groupExists(groupId)
//
//   if (!validGroupId) {
//     return {
//       statusCode: 404,
//       body: JSON.stringify({
//         error: 'Group does not exist'
//       })
//     }
//   }
//
//   const imageId = uuid.v4()
//   const newItem = await createImage(groupId, imageId, event)
//
//   const url = getUploadUrl(imageId)
//
//   return {
//     statusCode: 201,
//     body: JSON.stringify({
//       newItem: newItem,
//       uploadUrl: url
//     })
//   }
// })
//
// handler.use(
//   cors({
//     credentials: true
//   })
// )
//
// async function groupExists(groupId: string) {
//   const result = await docClient
//     .get({
//       TableName: groupsTable,
//       Key: {
//         id: groupId
//       }
//     })
//     .promise()
//
//   console.log('Get group: ', result)
//   return !!result.Item
// }
//
// async function createImage(groupId: string, imageId: string, event: any) {
//   const timestamp = new Date().toISOString()
//   const newImage = JSON.parse(event.body)
//
//   const newItem = {
//     groupId,
//     timestamp,
//     imageId,
//     ...newImage,
//     imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
//   }
//   console.log('Storing new item: ', newItem)
//
//   await docClient
//     .put({
//       TableName: imagesTable,
//       Item: newItem
//     })
//     .promise()
//
//   return newItem
// }
//
// function getUploadUrl(imageId: string) {
//   return s3.getSignedUrl('putObject', {
//     Bucket: bucketName,
//     Key: imageId,
//     Expires: urlExpiration
//   })
// }
