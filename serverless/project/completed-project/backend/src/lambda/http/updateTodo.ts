import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { updateTodo } from '../../businessLogic/todo'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

const STATUS_CREATED = 201

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoID = event.pathParameters.todoId
  const userID = getUserId(event)

  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const updatedItem = await updateTodo(updatedTodo, userID, todoID)

  return { statusCode: STATUS_CREATED,
           headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
           body: JSON.stringify({updatedTodo: updatedItem})
  }
}
