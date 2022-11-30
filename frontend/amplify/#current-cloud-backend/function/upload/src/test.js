const AWS = require('aws-sdk')

AWS.config.update({region: 'ca-central-1'});

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = "uploads";
(async () => {
  
  const condition = {}
  condition['uid'] = { 'AttributeValueList': ['doit.rant@gmail.com'], 'ComparisonOperator': 'EQ' };
  
  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  };
  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      console.log('err', err);
    } else {
      console.log('data', data);
    }
  });
})();
