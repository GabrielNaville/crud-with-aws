const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient()

const submitEmployee = employee => {
    console.log('Submitting employee');
    const employeeInfo = {
      TableName: process.env.EMPLOYEE_TABLE,
      Item: employee,
    };
    return dynamoDb.put(employeeInfo).promise()
      .then(res => employee);
  };
  
  const employeeInfo = (fullname, companyPosition, age) => {
    const timestamp = new Date();
    return {
      id: uuid.v1(),
      fullname: fullname,
      companyPosition: companyPosition,
      age: age,
      submittedAt: timestamp,
      updatedAt: timestamp,
    };
  };
  
  module.exports.create  = (event, context, callback) => {
    const reqBody = JSON.parse(event.body);
    const fullname = reqBody.fullname;
    const companyPosition = reqBody.companyPosition;
    const age = reqBody.age;
  
    submitEmployee(employeeInfo(fullname, companyPosition, age))
      .then(res => {
        callback(null, {
          statusCode: 201,
          body: JSON.stringify({
            message: `Sucessfully submitted employee ${fullname}`,
            employeeId: res.id
          })
        });
      })
      .catch(err => {
        console.log(err);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            message: `Unable to submit employee ${fullname}`
          })
        })
      });
  }
  