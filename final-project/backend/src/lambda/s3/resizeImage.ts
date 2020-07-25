
import 'source-map-support/register'
import { SNSEvent, SNSHandler } from 'aws-lambda'  //S3EventRecord

import { processImage } from '../../portsAdaptors/businessLogic'

export const handler: SNSHandler = async (event: SNSEvent) => {

  console.log('Processing SNS event ', JSON.stringify(event))

  for (const snsRecord of event.Records) {

    const s3EventStr = snsRecord.Sns.Message
    console.log('Processing S3 event', s3EventStr)

    const s3Event = JSON.parse(s3EventStr)

    for (const record of s3Event.Records) {
      const thisKey = record.s3.object.key
      await processImage(thisKey)
    }

  }
}
