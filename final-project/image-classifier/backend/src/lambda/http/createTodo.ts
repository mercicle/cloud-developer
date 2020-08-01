import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { createTodo } from '../../businessLogic/todo'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

const STATUS_CREATED = 201

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userID = getUserId(event)

  const eventJSONString = JSON.parse(event.body)
  console.log(`Creating: ${eventJSONString}`)

  const newItem = await createTodo(newTodo, userID)

  return {statusCode: STATUS_CREATED,
          headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
          body: JSON.stringify({item: newItem})
         }

}
