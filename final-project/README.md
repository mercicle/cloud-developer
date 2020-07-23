
# App

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
