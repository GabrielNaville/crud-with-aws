const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.findAll = (event, context, callback) => {
  
    console.info("Scanning Employee Table")
  
    return dynamoDb.scan({
        TableName: process.env.EMPLOYEE_TABLE,
    }).promise().then(res => {
        console.info('Response', res)
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
              employees: res.Items,
            })
          })
    }).catch(err => callback(null, {
        statusCode: err.statusCode,
        body: JSON.stringify({
            message: err.message,
        })
    }));
  }