import { APIGatewayProxyEvent } from "aws-lambda";
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserId(event: APIGatewayProxyEvent): string {
  
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}


export function getGroupId(event: APIGatewayProxyEvent): string {
  return event.pathParameters.groupId
}

export function getImageId(event: APIGatewayProxyEvent): string {
  return event.pathParameters.imageId
}

// export function getConnectionId(event: APIGatewayProxyEvent): string {
//   return event.requestContext.connectionId
// }
