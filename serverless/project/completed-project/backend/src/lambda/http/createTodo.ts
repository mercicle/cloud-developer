import 'source-map-support/register'

import * as uuid from 'uuid'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils'

const docClient = new AWS.DynamoDB.DocumentClient()
const todosTable = process.env.TODOS_TABLE
const STATUS_CREATED = 201

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userID = getUserId(event)
  const todoID = uuid.v4()

  console.log(`Creating TODO: ${todoID} for User ID: ${userID}`)

  const newItem = { todoId: todoID, userId: userID, ...newTodo }

  await docClient.put({TableName: todosTable, Item: newItem}).promise()

  return {statusCode: STATUS_CREATED,
          headers: {'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify({ newItem })
         }

}
