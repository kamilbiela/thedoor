import axios from 'axios';

const endpoint = global['__ENDPOINT__'];

describe('API: auth', function() {
  it('must return ok when username and password are valid', async () => {
    const result = await axios.post(`${endpoint}/api/auth/password`, {
      username: 'test@localhost',
      password: 'test password',
    });

    expect(result.status).toBe(200);
    expect(result.data).toHaveProperty('token');
    expect(result.data.token).toBeTruthy();
 });

  it('must return 401 when password is wrong', async () => {
    const result = await axios.post(`${endpoint}/api/auth/password`, {
      username: 'test@localhost',
      password: 'wrong',
    }, {
      validateStatus: () => true,
    });

    expect(result.status).toBe(401);
    expect(result.data).toEqual({error: 'wrong_username_or_password'});
 });

  it('must return 401 when username is wrong', async () => {
    const result = await axios.post(`${endpoint}/api/auth/password`, {
      username: 'test@localhost-wrong',
      password: 'test password',
    }, {
      validateStatus: () => true,
    });

    expect(result.status).toBe(401);
    expect(result.data).toEqual({error: 'wrong_username_or_password'});
 });

 // @todo unify error response
//  +   "errors": Array [
//   +     "password is a required field",
//   +   ],
//   +   "inner": Array [],
//   +   "message": "password is a required field",
//   +   "name": "ValidationError",
//   +   "params": Object {
//   +     "path": "password",
//   +   },
//   +   "path": "password",
//   +   "type": "required",
//   +   "value": Object {},
//   it('must return 400 when params are missing', async () => {
//     const result = await axios.post(`${endpoint}/api/auth/password`, {}, {
//       validateStatus: () => true,
//     });

//     expect(result.status).toBe(400);
//     expect(result.data).toEqual({error: 'wrong_username_or_password'});
//  });
});
