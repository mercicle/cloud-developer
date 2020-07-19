
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate} from '../models/TodoUpdate'

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { S3 } from 'aws-sdk/clients/s3'
import * as uuid from 'uuid'


export class TodoAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly s3Client: S3 = createS3Client(),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly todoIndex = process.env.INDEX_NAME,
        private readonly bucketName = process.env.TODO_IMAGES_S3_BUCKET,
        private readonly urlExpTime = parseInt(process.env.SIGNED_URL_EXPIRATION)){}

    async createTodo(todo: TodoItem): Promise<TodoItem> {

        const putObject = { TableName: this.todoTable, Item: todo}

        await this.docClient.put(putObject).promise()

        return todo

    }

    async updateTodo(updatedTodo: TodoUpdate, userId: string, todoId: string): Promise<TodoUpdate> {

        // name is a reserved keyword: https://knowledge.udacity.com/questions/201486
        const dynamoQuery = {

          TableName: this.todoTable,
          IndexName: this.todoIndex,
          Key: { todoId: todoId , userId: userId},
          ExpressionAttributeNames: { "#N": "name" },
          UpdateExpression: "set #N=:todoName, dueDate =:dueDate, done =:done",
          ExpressionAttributeValues: { ":todoName": updatedTodo.name, ":dueDate": updatedTodo.dueDate, ":done": updatedTodo.done},
          ReturnValues: "UPDATED_NEW"

        }

        await this.docClient.update(dynamoQuery).promise()

        return updatedTodo

    }

    async getSignedUrl(){

        const imageID = uuid.v4()
        const imageURL = `https://${this.bucketName}.s3.amazonaws.com/${imageID}`

        const signedURL = this.s3Client.getSignedUrl('putObject',{ Bucket: this.bucketName, Key: imageID, Expires: this.urlExpTime })
        return {imageUrl: imageURL, uploadUrl: signedURL}

    }

    async setTodoImageUrl(userId: string, todoId: string){

        const urlObject = await this.getSignedUrl()

        const dynamoQuery = {
                TableName: this.todoTable,
                IndexName: this.todoIndex,
                Key: { todoId: todoId , userId: userId },
                UpdateExpression: "set attachmentUrl = :a",
                ExpressionAttributeValues:{":a": urlObject.imageUrl},
                ReturnValues:"UPDATED_NEW"
        }

        await this.docClient.update(dynamoQuery).promise()

        return urlObject

    }

    async deleteTodo(userID: string, todoID: string) {

        const deleteQuery = { TableName: this.todoTable, Key: { todoId: todoID, userId: userID } }

        await this.docClient.delete(deleteQuery).promise()

    }

    async getTodo(userId: string, todoId: string): Promise<TodoItem[]> {

      const getQuery = {TableName: this.todoTable, KeyConditionExpression: 'userId = :userId AND todoId = :todoId', ExpressionAttributeValues: {':userId': userId, ':todoId': todoId}}
      const result = await this.docClient.query(getQuery).promise()
      const items = result.Items

      return items as TodoItem[]

    }

    async getAllTodos(userId: string): Promise<TodoItem[]> {

        const getAllQuery = { TableName: this.todoTable, KeyConditionExpression: 'userId = :userId',ExpressionAttributeValues: { ':userId': userId }}
        const result = await this.docClient.query(getAllQuery).promise()
        const items = result.Items

        return items as TodoItem[]

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

// from lesson
// import * as AWS  from 'aws-sdk'
// import * as AWSXRay from 'aws-xray-sdk'
// import { DocumentClient } from 'aws-sdk/clients/dynamodb'
//
// const XAWS = AWSXRay.captureAWS(AWS)
//
// import { Group } from '../models/Group'
//
// export class GroupAccess {
//
//   constructor(
//     private readonly docClient: DocumentClient = createDynamoDBClient(),
//     private readonly groupsTable = process.env.GROUPS_TABLE) {
//   }
//
//   async getAllGroups(): Promise<Group[]> {
//     console.log('Getting all groups')
//
//     const result = await this.docClient.scan({
//       TableName: this.groupsTable
//     }).promise()
//
//     const items = result.Items
//     return items as Group[]
//   }
//
//   async createGroup(group: Group): Promise<Group> {
//     await this.docClient.put({
//       TableName: this.groupsTable,
//       Item: group
//     }).promise()
//
//     return group
//   }
// }
//
// function createDynamoDBClient() {
//   if (process.env.IS_OFFLINE) {
//     console.log('Creating a local DynamoDB instance')
//     return new XAWS.DynamoDB.DocumentClient({
//       region: 'localhost',
//       endpoint: 'http://localhost:8000'
//     })
//   }
//
//   return new XAWS.DynamoDB.DocumentClient()
// }
