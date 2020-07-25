
import 'source-map-support/register'
import { getAllGroups } from '../../portsAdaptors/businessLogic';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

const STATUS_OK = 200

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Getting groups ', event)
  const groups = await getAllGroups()

  // let returnBody = ""
  // if(!!groups){
  //   returnBody  = JSON.stringify(groups)
  // }else{
  //   returnBody  = JSON.stringify([])
  // }

  // let returnBody = ""
  // if(!!groups){
  //   returnBody  = JSON.stringify({ groups: groups })
  // }else{
  //   returnBody  = JSON.stringify({ groups:[] })
  // }

  // have also tried
  // JSON.stringify({ groups: groups })
  // JSON.stringify({ groups })
  return {statusCode: STATUS_OK,
          headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
          body: JSON.stringify(groups)
         }

}
