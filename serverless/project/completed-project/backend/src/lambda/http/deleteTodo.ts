import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { getUserId } from '../utils'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const TODOS_TABLE = process.env.TODOS_TABLE
const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const todoID = event.pathParameters.todoId
    const userID = getUserId(event)

    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property
    // this thread made me realize I was missing userID in Key https://knowledge.udacity.com/questions/92594
    await dynamoDocClient.delete({ TableName: TODOS_TABLE, Key: { todoId: todoID , userId: userID} }).promise()

    // https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete
    return { statusCode: STATUS_OK,
             headers: { 'Access-Control-Allow-Origin': '*' , 'Access-Control-Allow-Credentials': true },
             body:'Item Deleted'
           }
}
