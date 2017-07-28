const UsersDB = require('../api/models/Users');
const connect = require('../api/models/db');

describe('#Test user controller', () => {

  beforeEach(async() => {
    await connect.connection('test');
    await UsersDB.remove().exec();
  });

  it('should save a user with empty value', async() => {
    const user = {};

    const newuser = new UsersDB(user);
    const response = await newuser.save();
    expect(response.user_name).toEqual('');
    expect(response.user_mail).toEqual('');
    expect(response.password).toEqual('');
    expect(response.create_date).not.toBe('');
    // expect(response).toMatchSnapshot();
  });
});
