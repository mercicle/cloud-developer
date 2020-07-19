import 'source-map-support/register'
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getUserId } from '../utils'
import { getAllTodos } from '../../businessLogic/todo'

const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const userID = getUserId(event)
    console.log(`Getting TODO: ${userID}`)

    const itemsPromised = await getAllTodos(userID)
    const stringifiedItems = JSON.stringify({ items: itemsPromised })

    console.log(`Returning TODOs: ${stringifiedItems}`)

    // this thread helped me realize needed {items: }
    //https://knowledge.udacity.com/questions/183910
    return { statusCode: STATUS_OK,
              headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
              body: stringifiedItems
           }
}


// import 'source-map-support/register'
//
// import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
// import * as AWS from 'aws-sdk'
// //import * as AWSXRay from 'aws-xray-sdk'
// const AWSXRay = require('aws-xray-sdk')
// import { getUserId } from '../utils'
//
// const XAWS = AWSXRay.captureAWS(AWS)
//
// const dynamoDocClient = new XAWS.DynamoDB.DocumentClient()
// const TODOS_TABLE = process.env.TODOS_TABLE
//
// const STATUS_OK = 200
//
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//
//     const userID = getUserId(event)
//     console.log(`Getting TODO: ${userID}`)
//
//     const dynamoQuery = {
//         TableName : TODOS_TABLE,
//         KeyConditionExpression: 'userId = :userId',
//         ExpressionAttributeValues: { ':userId': userID },
//     }
//
//     //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
//     const returnedQueryPromise = await dynamoDocClient.query(dynamoQuery).promise()
//     const itemsReturned = returnedQueryPromise.Items
//
//     const stringifiedItems = JSON.stringify({ items: itemsReturned })
//     console.log(`Returning TODOs: ${stringifiedItems}`)
//
//     // this thread helped me realize needed {items: }
//     //https://knowledge.udacity.com/questions/183910
//     return { statusCode: STATUS_OK,
//               headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
//               body: stringifiedItems
//            }
// }
