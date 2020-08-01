import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTodo } from '../../businessLogic/todo'

const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const todoID = event.pathParameters.todoId
    const userID = getUserId(event)

    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property
    //this thread made me realize I was missing userID in Key https://knowledge.udacity.com/questions/92594
    const deleteTodoItem  = await deleteTodo(userID, todoID)

    // https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete
    return { statusCode: STATUS_OK,
             headers: { 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Credentials': true },
             body: JSON.stringify({deleted: deleteTodoItem})
           }
}
