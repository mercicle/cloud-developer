import 'source-map-support/register'

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import { getUserId } from '../utils'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const TODOS_TABLE = process.env.TODOS_TABLE

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

    const returnedQueryPromise = await dynamoDocClient.query(dynamoQuery).promise()
    const itemsReturned = returnedQueryPromise.Items

    return { statusCode: 200,
              headers: { 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify({ itemsReturned })
           }
}
