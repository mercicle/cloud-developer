
import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
const XAWS = AWSXRay.captureAWS(AWS)
import { TodoItem } from '../models/TodoItem'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

export class TodoAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly todoIndex = process.env.INDEX_NAME){}

    async createTodo(todo: TodoItem): Promise<TodoItem> {

        const putObject = { TableName: this.todoTable, Item: todo}

        await this.docClient.put(putObject).promise()

        return todo

    }

    async updateTodo(updatedTodo: TodoItem): Promise<TodoItem> {

        // name is a reserved keyword: https://knowledge.udacity.com/questions/201486
        const dynamoQuery = {

          TableName: this.todoTable,
          IndexName: this.todoIndex,
          Key: { todoId: updatedTodo.todoId , userId: updatedTodo.userId},
          ExpressionAttributeNames: { "#N": "name" },
          UpdateExpression: "set #N=:todoName, dueDate =:dueDate, done =:done",
          ExpressionAttributeValues: { ":todoName": updatedTodo.name, ":dueDate": updatedTodo.dueDate, ":done": updatedTodo.done},
          ReturnValues: "UPDATED_NEW"

        }

        await this.docClient.update(dynamoQuery).promise()

        return updatedTodo

    }

    async updateTodoUrl(updatedTodo: TodoItem): Promise<TodoItem> {

        const dynamoQuery = {
                TableName: this.todoTable,
                IndexName: this.todoIndex,
                Key: { todoId: updatedTodo.todoId , userId: updatedTodo.userId},
                UpdateExpression: "set attachmentUrl = :a",
                ExpressionAttributeValues:{":a": updatedTodo.attachmentUrl},
                ReturnValues:"UPDATED_NEW"
        }

        await this.docClient.update(dynamoQuery).promise()

        return updatedTodo

    }

    async removeTodo(userID: string, todoID: string) {

        const deleteQuery = { TableName: this.todoTable, Key: { todoId: todoID, userId: userID } }

        await this.docClient.delete(deleteQuery).promise()

    }

    async getTodo(userId: string, todoId: string): Promise<TodoItem[]> {

      const getQuery = {TableName: this.todoTable, KeyConditionExpression: 'userId = :userId AND todoId = :todoId', ExpressionAttributeValues: {':userId': userId, ':todoId': todoId}}
      const result = await this.docClient.query(getQuery).promise()
      const items = result.Items

      return items

    }

    async getAllTodos(userId: string): Promise<TodoItem[]> {

        const getAllQuery = { TableName: this.todoTable, KeyConditionExpression: 'userId = :userId',ExpressionAttributeValues: { ':userId': userId }}
        const result = await this.docClient.query(getAllQuery).promise()
        const items = result.Items

        return items

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
