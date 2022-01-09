const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.update = (event, context, callback) => {
  
    const body = JSON.parse(event.body);
    const { fullname, companyPosition, age } = body
  
    const params = {
        TableName: process.env.EMPLOYEE_TABLE,
        Key: {
            id: event.pathParameters.id
        },
        ConditionExpression: 'attribute_exists(id)',
        UpdateExpression: 'SET fullname = :fullname, companyPosition = :companyPosition, age = :age',
        ExpressionAttributeValues: {
        ':fullname': fullname,
        ':companyPosition': companyPosition,
        ':age': age
        },
        ReturnValue: 'ALL_NEW'
    }
    return dynamoDb.update(params)
        .promise()
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                  employees: res.Items,
                })
              })
        })
        .catch(err => callback(null, {
            statusCode: err.statusCode,
            body: JSON.stringify({
                message: err.message,
            })
          }))
  }