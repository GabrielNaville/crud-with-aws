
const updateFields = (body) => {
    let UpdateExpression = 'SET ';
    const ExpressionAttributeValues = {};
    const keys = Object.keys(body)
    keys.map(
        key => {
        UpdateExpression += `${key} = :${key}, `;
        ExpressionAttributeValues[`:${key}`] = body[key];
        }
    );
    UpdateExpression = UpdateExpression.slice(0, -2);
    return { UpdateExpression, ExpressionAttributeValues }
  }

module.exports = {
    updateFields
}