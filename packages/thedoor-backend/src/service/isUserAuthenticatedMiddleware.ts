import * as express from 'express';
import { UserService } from '../service/UserSerivce';
import jwt from 'jsonwebtoken';
import { Config } from '../model/Config';
import { JwtTokenData } from '../model/JwtTokenData';

export function isUserAuthentiactedMiddleware(userService: UserService, jwtSecret: Config['jwtSecret']): express.RequestHandler {
  return async (req, res, next) => {
    try {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2) {
        const rawToken = parts[1];
        const decodedToken = jwt.verify(rawToken, jwtSecret) as JwtTokenData;
        res.locals.token = decodedToken;
        return next();
      }
    } catch (e) {
      console.log(e);
      res.status(401).send({error: 'invalid_token'});
    }
  }
}
