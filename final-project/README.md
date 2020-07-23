
# App

(Option 2): Functionality

CRITERIA

A user of the web application can use the interface to create, delete and complete an item.

A user of the web interface can click on a "pencil" button, then select and upload a file. A file should appear in the list of items on the home page.

If you log out from a current user and log in as a different user, the application should not show items created by the first account.

A user needs to authenticate in order to use an application.


(Option 2):Codebase

CRITERIA

Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.

To get results of asynchronous operations, a student is using async/await constructs instead of passing callbacks.

(Option 2):Best practices

CRITERIA

All resources needed by an application are defined in the "serverless.yml". A developer does not need to create them manually using AWS console.

Instead of defining all permissions under provider/iamRoleStatements, permissions are defined per function in the functions section of the "serverless.yml".

Application has at least some of the following:

Distributed tracing is enabled
It has a sufficient amount of log statements
It generates application level metrics
HTTP requests are validated

Incoming HTTP requests are validated either in Lambda handlers or using request validation in API Gateway. The latter can be done either using the serverless-reqvalidator-plugin or by providing request schemas in function definitions.


(Option 2):Architecture

CRITERIA

1:M (1 to many) relationship between users and items is modeled using a DynamoDB table that has a composite key with both partition and sort keys. Should be defined similar to this:

   KeySchema:
      - AttributeName: partitionKey
        KeyType: HASH
      - AttributeName: sortKey
        KeyType: RANGE

Items are fetched using the "query()" method and not "scan()" method (which is less efficient on large datasets)


# How to run the front and back end

## Backend

To deploy an application run the following commands (you'll need to change the prefixes in the serverless.yaml since that are globally unique)

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

# Steps to Completion

Step 1:

# Submission

The following video and screenshots are for the project submission.

## Video
![demo gif](./screenshots/demo-gif.gif)

## DynamoDB
![dynamo](./screenshots/dynamodb-screenshot.png)

## s3
![s3](./screenshots/s3-screenshot.png)

## CloudWatch
![cloudwatch](./screenshots/cloudwatch-screenshot.png)

## Lambda
![lambda](./screenshots/lambdas-screenshot.png)

## XRay Screenshot
![xray](./screenshots/xray-screenshot.png)
