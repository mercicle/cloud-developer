import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const TODOS_TABLE = process.env.TODOS_TABLE
const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const todoID = event.pathParameters.todoId

    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property
    await dynamoDocClient.delete({ TableName: TODOS_TABLE, Key: { todoId: todoID } }).promise()

    // https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete
    return { statusCode: STATUS_OK,
             headers: { 'Access-Control-Allow-Origin': '*' },
             body:'Item removed'
           }
}