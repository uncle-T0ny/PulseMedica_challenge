const AWS = require('aws-sdk')

AWS.config.update({ region: process.env.TABLE_REGION });
const tableName = "uploads";

const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const fileName = key.split('/').pop();
  const [email, timestamp] = decodeURIComponent(fileName).split(':');
  
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
  
  let putItemParams = {
    TableName: tableName,
    Item: {
      email,
      timestamp,
      id: key,
      uid: email,
    }
  }
  
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      console.log('Error putting item into dynamodb:', err);
    } else{
      console.log('Successfully put item into dynamodb:', data);
    }
  });
  
};
