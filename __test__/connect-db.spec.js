const UsersDB = require('../api/models/Users');
const connect = require('../api/models/db');

const { expect } = require("chai");

describe('#Test user controller', () => {
  it('should be true', () => {
    expect(true).true
  })

  beforeEach(async () => {
    await connect.connection('test');
    await UsersDB.remove().exec();
  });

  it('should save a user with empty value', async () => {
    const user = {};

    const newUser = new UsersDB(user);
    const response = await newUser.save();
    expect(response.user_name).equal('');
    expect(response.user_mail).equal('');
    expect(response.password).equal('');
    expect(response.create_date).not.equal('');
    // expect(response).toMatchSnapshot();
  });
});
