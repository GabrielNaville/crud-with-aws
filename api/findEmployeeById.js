const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.findById = (event, context, callback) => {
    console.info('Event', event)

    return dynamoDb.get({
        TableName: process.env.EMPLOYEE_TABLE,
        Key: {
            id: event.pathParameters.id,
        }
    }).promise()
        .then(res => {
            if(res.Item) {
                return callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(res.Item)
                })
            } else {
                return callback(null, {
                    statusCode: 404,
                    body: JSON.stringify({error: "Employee not found"})
                })
            }
        })
        .catch(err => {
        console.error(err);
        callback(new Error('Couldnt fetch employee'));
        return;
        })
    }
