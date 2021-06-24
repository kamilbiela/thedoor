import axios from 'axios';
import jwt from 'jsonwebtoken';

const endpoint = global['__ENDPOINT__'];

describe('API: auth', function() {
  it('must return ok when username and password are valid', async () => {
    const result = await axios.post(`http://localhost:8123/api/auth/password`, {
      username: 'user1',
      password: 'test',
    });

    expect(result.status).toBe(200);
    expect(result.data).toHaveProperty('token');

    const decodedToken = jwt.decode(result.data.token);
    expect(decodedToken).toMatchObject({
      username: 'user1',
    });
 });

  it('must return 401 when password is wrong', async () => {
    const result = await axios.post(`${endpoint}/api/auth/password`, {
      username: 'user1',
      password: 'wrong',
    }, {
      validateStatus: () => true,
    });

    expect(result.status).toBe(401);
    expect(result.data).toEqual({error: 'wrong_username_or_password'});
 });

  it('must return 401 when username is wrong', async () => {
    const result = await axios.post(`${endpoint}/api/auth/password`, {
      username: 'userXXX',
      password: 'test',
    }, {
      validateStatus: () => true,
    });

    expect(result.status).toBe(401);
    expect(result.data).toEqual({error: 'wrong_username_or_password'});
 });
});
