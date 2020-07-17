import 'source-map-support/register'

import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const TODOS_TABLE = process.env.TODOS_TABLE
const STATUS_CREATED = 201

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userID = getUserId(event)
  const todoID = uuid.v4()

  console.log(`Creating TODO: ${todoID} for User ID: ${userID}`)

  const newItem = { todoId: todoID, userId: userID, ...newTodo }

  //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
  await dynamoDocClient.put({TableName: TODOS_TABLE, Item: newItem}).promise()

  return {statusCode: STATUS_CREATED,
          headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
          body: JSON.stringify({item: newItem})
         }

}
