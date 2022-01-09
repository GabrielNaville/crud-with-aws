const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.delete = (event, context, callback) => {
    const id = event.pathParameters.id;
    const params = {
      Key: {
        id: id
      },
      TableName: process.env.EMPLOYEE_TABLE
    };
    return dynamoDb.delete(params)
        .promise()
        .then(() => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Post deleted successfully',
                })
              })
        })
        .catch(err => callback(null, {
            statusCode: err.statusCode,
            body: JSON.stringify({
                message: err.message,
            })
          }))
  };