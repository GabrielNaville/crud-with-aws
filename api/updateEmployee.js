const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const handlerFields = require('../functions/updateFields')

const update = async (event, context, callback) => {
  
    const body = JSON.parse(event.body);
    const { UpdateExpression, ExpressionAttributeValues } = handlerFields.updateFields(body)
  
    const params = {
        TableName: process.env.EMPLOYEE_TABLE,
        Key: {
            id: event.pathParameters.id
        },
        ConditionExpression: 'attribute_exists(id)',
        UpdateExpression: UpdateExpression,
        ExpressionAttributeValues: ExpressionAttributeValues,
        ReturnValue: 'UPDATED_NEW'
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

  module.exports = {
    update
  }