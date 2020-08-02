
# SLS Udagram App

Welcome! For final project decided to complete the Udagram app from serverless excercises and implement a full haxagonal architecture. Some notes:

1. Was stuck for about a week (learned a lot about troubleshooting sls though!) on a silly error regarding having an Auth on my getGroups service when the business logic on frontend did not require it. I was getting a 401 Unauthorized and myself and mentors had no idea why.
2. I went beyond the original hexagonal and also redesigned/implemented a lot of the backend including consolidating and adding models for validation and consolidating all the getId functions into helpers file /utils/getIdsFromEvents
3. There are options available to use any of the three authorization methods (JSON web key set, rs256/certificate, and AMZ KMS)

## Functionality

  ✅ A user of the web application can use the interface to create, delete and complete an item (only create because I didn't want to focus on Frontend development)

  ✅ If you log out from a current user and log in as a different user, the application should not show items created by the first account.

  ✅ A user needs to authenticate in order to use an application.


## Codebase

  ✅ Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.

  ✅ To get results of asynchronous operations, a student is using async/await constructs instead of passing callbacks.

## Best practices

  ✅ All resources needed by an application are defined in the "serverless.yml". A developer does not need to create them manually using AWS console.

  ✅ Instead of defining all permissions under provider/iamRoleStatements, permissions are defined per function in the functions section of the "serverless.yml".

  ✅ Distributed tracing is enabled

  ✅ It has a sufficient amount of log statements

  ✅ HTTP requests are validated

## Architecture

  ✅ 1:M (1 to many) relationship between users and items is modeled using a DynamoDB table that has a composite key with both partition and sort keys. Should be defined similar to this:

  ✅ Items are fetched using the "query()" method and not "scan()" method (which is less efficient on large datasets)


# Steps to Build and Run

Step 1:
```
cd backend
```

Step 2: Change the prefixes of your resources in the serverless.yaml file. e.g.:

```
...
GROUPS_TABLE: [your prefix]-groups-${self:provider.stage}
...
```

**Note:** the app default authorizer is JSON Web Key Set. However you can uncomment/comment another handler and you have (JSON web key set, rs256/certificate, and AMZ KMS) options. This will change what you need to do in Step 6.

Step 3:

```
npm install
sls deploy -v

```

Save the appId e.g. https://**m4n0c8xvaf**.execute-api.us-east-2.amazonaws.com/dev/groups after successful deployment.

Step 4

```
cd ..
cd client

```

Step 5: Create a App on Auth0 and specify http://localhost:3000 on your Allowed Callback URLs, Allowed Logout URLs and Allowed Web Origins.

Step 6: Go to Advanced Settings > Endpoints > JSON Web Key Set and copy/paste into the backend/src/lambda/authauth0AuthorizerWKS.ts file.

Step 7: Update client/src/config.ts with the appId from sls app and the Auth0 app info (you would have to create a new app):

const apiId = '[your app id]'
const region = '[your region - same as region in sls.yaml]'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`

export const authConfig = {
  domain: '[your Auth0 app domain]',
  clientId: '[your Auth0 client id]',
  callbackUrl: 'http://localhost:3000/callback',
  returnTo:  'http://localhost:3000'
}

Then run:

```
npm install && run start
```


## Feedback

Would have loved a tutorial on the frontend to get a better understanding for the design and logic especially for those that either don't know React or it's been a while. Even more so when Ionic is involved :-D Thx!
