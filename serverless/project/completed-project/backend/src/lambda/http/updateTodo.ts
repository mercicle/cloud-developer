import 'source-map-support/register'

import * as AWS from 'aws-sdk'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

const dynamoDocClient = new AWS.DynamoDB.DocumentClient()
const TODOS_TABLE = process.env.TODOS_TABLE
const STATUS_CREATED = 201

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const todoID = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

  const params = {
    TableName: TODOS_TABLE,
    Key: { "todoId": todoID },
    UpdateExpression: "set name =:n, dueDate =:dd, done =:d",
    ExpressionAttributeValues:{ ":n": updatedTodo["name"], ":dd": updatedTodo["dueDate"], ":d": updatedTodo["done"]},
    ReturnValues:"UPDATED_NEW"
  }

  await dynamoDocClient.update(params).promise()

  return { statusCode: STATUS_CREATED,
           headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
           body: JSON.stringify(updatedTodo)
  }
}

//Example from https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.03
// var params = {
//     TableName:table,
//     Key:{
//         "year": year,
//         "title": title
//     },
//     UpdateExpression: "set info.rating = :r, info.plot=:p, info.actors=:a",
//     ExpressionAttributeValues:{
//         ":r":5.5,
//         ":p":"Everything happens all at once.",
//         ":a":["Larry", "Moe", "Curly"]
//     },
//     ReturnValues:"UPDATED_NEW"
// };
//
// console.log("Updating the item...");
// docClient.update(params, function(err, data) {
//     if (err) {
//         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });


// Example from https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
// var params = {
//   TableName: 'Table',
//   Key: { HashKey : 'hashkey' },
//   UpdateExpression: 'set #a = :x + :y',
//   ConditionExpression: '#a < :MAX',
//   ExpressionAttributeNames: {'#a' : 'Sum'},
//   ExpressionAttributeValues: {
//     ':x' : 20,
//     ':y' : 45,
//     ':MAX' : 100,
//   }
// };
//
// documentClient.update(params, function(err, data) {
//    if (err) console.log(err);
//    else console.log(data);
// });
