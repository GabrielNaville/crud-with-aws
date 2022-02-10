const update = require('../../functions/updateFields');

describe('updateFields', () => {
    it('should return UpdateExpression', async () => {
        const pay = {fullname: 'Teste Nome', companyPosition: 'Manager', age: 23}
        const { UpdateExpression } = update.updateFields(pay);
        expect(UpdateExpression).toEqual(expect.stringContaining('SET fullname = :fullname, companyPosition = :companyPosition, age = :age'))
    });
    it('should return UpdateExpression without companyPosition', async () => {
        const pay = {fullname: 'Teste Nome', age: 23}
        const { UpdateExpression } = update.updateFields(pay);
        expect(UpdateExpression).toEqual(expect.stringContaining('SET fullname = :fullname, age = :age'))
    });
    it('should return ExpressionAttributeValues', async () => {
        const pay = {fullname: 'Teste Nome', age: 23}
        const { ExpressionAttributeValues } = update.updateFields(pay);
        expect(ExpressionAttributeValues).toEqual(expect.objectContaining({":age": 23, ":fullname": "Teste Nome"}))
    });
});