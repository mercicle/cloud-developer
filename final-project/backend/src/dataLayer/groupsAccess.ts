
import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)

import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Group } from '../models/Group'

// export interface Group {
//   groupId: string
//   name: string
//   description: string
//   userId: string
//   timestamp: string
// }

import * as uuid from 'uuid'

export class GroupAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly s3Client = createS3Client(),
    private readonly groupsTable = process.env.GROUPS_TABLE,
    private readonly imagesTable = process.env.IMAGES_TABLE,
    private readonly imagesIndex = process.env.IMAGE_ID_INDEX,
    private readonly imagesbucket = process.env.IMAGES_S3_BUCKET,
    private readonly thumbnailsBucket = process.env.THUMBNAILS_S3_BUCKET,
    private readonly urlExpTime = parseInt(process.env.SIGNED_URL_EXPIRATION)) {
  }

  async createGroup(groupRequestObject: any): Promise<Group> {

    const createdAt = new Date().toISOString()
    const groupId = uuid.v4()
    groupRequestObject['timestamp'] = createdAt
    groupRequestObject['groupId'] = groupId

    const putObject = { TableName: this.groupsTable, Item: groupRequestObject }
    await this.docClient.put(putObject).promise()

    const returnObject = {userId: groupRequestObject.userId,
                          groupId: groupRequestObject.groupId,
                          name: groupRequestObject.name,
                          description: groupRequestObject.description,
                          timestamp: groupRequestObject.timestamp}

    return returnObject

  }

  async getAllGroups(): Promise<Group[]> {

    console.log('Getting all groups')

    const result = await this.docClient.scan({ TableName: this.groupsTable}).promise()
    const items = result.Items

    return items as Group[]

  }

}

function createDynamoDBClient() {
  return new XAWS.DynamoDB.DocumentClient()
}

function createS3Client() {
  return new XAWS.S3({signatureVersion: 'v4'})
}
