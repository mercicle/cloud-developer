import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { getUserId } from '../utils'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const TODOS_TABLE = process.env.TODOS_TABLE
const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const userID = getUserId(event)
    console.log(`Getting TODO: ${userID}`)

    const dynamoQuery = {
        TableName : TODOS_TABLE,
        IndexName: "UserIdIndex",
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: { ':userId': userID },
        ScanIndexForward: false
    }

    //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
    const returnedQueryPromise = await dynamoDocClient.query(dynamoQuery).promise()
    const itemsReturned = returnedQueryPromise.Items

    return { statusCode: STATUS_OK,
              headers: { 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify({ itemsReturned })
           }
}
