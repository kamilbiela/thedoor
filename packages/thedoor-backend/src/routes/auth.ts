import * as yup from 'yup';
import * as express from 'express';
import { UserService } from '../service/UserSerivce';

export const validateBodyParams = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export function postAuthLogin(userAuthService: UserService): express.RequestHandler {
  return async (req, res, next) => {
    try {
      const data = await validateBodyParams.validate(req.body);
      const user = await userAuthService.login(data.username, data.password);
      if (!user) {
        res.status(401).send({error: 'wrong_username_or_password'});
        return;
      }

      const token: string = await userAuthService.issueTokenForUser(user);

      res.status(200).send({token});
    } catch (e) {
      return next(e);
    }
  }
}

export default postAuthLogin;
