'use strict'

const AWS = require('aws-sdk')
const uuid = require('uuid')

const docClient = new AWS.DynamoDB.DocumentClient()
const groupsTable = process.env.GROUPS_TABLE

console.log('Processing event:')

exports.handler = async (event) => {

  console.log('Processing event: ', event)

  const itemId = uuid.v4()

  //const parsedBody = typeof event.body === "object" ? event.body : JSON.parse(event.body)

  const parsedBody = JSON.parse(event.body)
  //const parsedBody = event

  const newItem = {
    id: itemId,
    ...parsedBody
    //parsedBody.body.name,
    //parsedBody.body.description
  }

  await docClient.put({
    TableName: groupsTable,
    Item: newItem
  }).promise()

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,POST'
    },
    body: JSON.stringify({newItem})
  }
}
