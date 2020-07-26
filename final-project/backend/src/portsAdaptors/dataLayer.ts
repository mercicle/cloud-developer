
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import * as uuid from 'uuid'
import Jimp from 'jimp/es'

import { Group, Image, CreateImageRequest, CreateGroupRequest } from '../models/Models'

export class DataAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly s3Client = createS3Client(),
    private readonly groupsTable = process.env.GROUPS_TABLE,
    private readonly imagesTable = process.env.IMAGES_TABLE,
    private readonly imageIdIndex = process.env.IMAGE_ID_INDEX,
    private readonly imagesBucket = process.env.IMAGES_S3_BUCKET,
    private readonly thumbnailsBucket = process.env.THUMBNAILS_S3_BUCKET,
    private readonly urlExpTime = parseInt(process.env.SIGNED_URL_EXPIRATION)) {
  }

  async createGroup(groupRequestObject: CreateGroupRequest, userId: string): Promise<Group> {

    const timestamp = new Date().toISOString()
    const groupId = uuid.v4()

    const NewGroup = {userId,
                      groupId,
                      name: groupRequestObject.name,
                      description: groupRequestObject.description,
                      timestamp}

    const putObject = { TableName: this.groupsTable, Item: NewGroup }
    await this.docClient.put(putObject).promise()

    return NewGroup

  }

  async getAllGroups(): Promise<Group[]> {

    console.log('Getting all groups in getAllGroups()')

    const result = await this.docClient.scan({ TableName: this.groupsTable}).promise()
    const items = result.Items

    return items as Group[]

  }

  async groupExists(groupId: string):Promise<any> {

    const testGroup = {TableName: this.groupsTable, Key: { groupId: groupId } }

    const result = await this.docClient.get(testGroup).promise()

    return !!result.Item

  }

  async createImage(imageRequestObject: CreateImageRequest, groupId: string):Promise<Image> {

    const timestamp = new Date().toISOString()
    const urlObject = await this.getSignedUrl()

    const newImageItem = {groupId,
                          timestamp,
                          ...imageRequestObject,
                          imageUrl: urlObject.imageUrl,
                          imageId: urlObject.imageId,
                          uploadUrl: urlObject.uploadUrl
                         }

    const finalPutObjectString = JSON.stringify(newImageItem)
    console.log(`Creating Image: ${finalPutObjectString}`)

    await this.docClient.put({TableName: this.imagesTable, Item: newImageItem }).promise()

    return newImageItem

  }

  async getSignedUrl(){

      const imageID = uuid.v4()
      const imageURL = `https://${this.imagesBucket}.s3.amazonaws.com/${imageID}`

      const signedURL = this.s3Client.getSignedUrl('putObject',{ Bucket: this.imagesBucket, Key: imageID, Expires: this.urlExpTime })
      return {imageId: imageID, imageUrl: imageURL, uploadUrl: signedURL}

  }

  async getImage(imageId: string):Promise<any>{

    const imageQuery = { TableName : this.imagesTable,
                         IndexName : this.imageIdIndex,
                         KeyConditionExpression: 'imageId = :imageId',
                         ExpressionAttributeValues: { ':imageId': imageId}
                       }

    const result = await this.docClient.query(imageQuery).promise()

    return result

  }

  async getImagesOfGroup(groupId: string):Promise<Image[]>{

    const groupQuery = {TableName: this.imagesTable,
                        KeyConditionExpression: 'groupId = :groupId',
                        ExpressionAttributeValues: {
                          ':groupId': groupId
                        },
                        ScanIndexForward: false
                      }

    const result = await this.docClient.query(groupQuery).promise()

    return result.Items as Image[]
  }

  async processImage(key: string) {

    console.log('Processing S3 item with key: ', key)

    const response = await this.s3Client.getObject({Bucket: this.imagesBucket, Key: key }).promise()

    const body = response.Body
    const image = await Jimp.read(body)

    console.log('Resizing image')
    image.resize(150, Jimp.AUTO)
    const convertedBuffer = await image.getBufferAsync(Jimp.AUTO)

    console.log(`Writing image back to S3 bucket: ${this.thumbnailsBucket}`)

    await this.s3Client.putObject({ Bucket: this.thumbnailsBucket, Key: `${key}.jpeg`, Body: convertedBuffer }).promise()

  }


}

function createDynamoDBClient() {

  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}

function createS3Client() {
  return new XAWS.S3({signatureVersion: 'v4'})
}
