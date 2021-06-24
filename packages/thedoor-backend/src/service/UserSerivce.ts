import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Config } from "../model/Config";
import { JwtTokenData } from "../model/JwtTokenData";

export class UserService {
  constructor(
    private prismaClient: PrismaClient,
    private jwtSecret: Config['jwtSecret'],
  ) {}

  async login(username: string, plaintextPassword: string): Promise<Omit<User, 'password'> | undefined> {
    const user = await this.prismaClient.user.findFirst({
      where: {
        username,
      }
    });

    if (!user) {
      return;
    }

    if (await bcrypt.compare(plaintextPassword, user.password) === false)  {
      return;
    }

    let {password, ...userWithoutPasswordProp} = user;
    return userWithoutPasswordProp;
  }

  async issueTokenForUser(user: {id: string, username: string}): Promise<string> {
    const tokenData: JwtTokenData = {
      id: user.id,
      username: user.username,
    };

    return new Promise((resolve, reject) => {
      jwt.sign(
        tokenData,
        this.jwtSecret,
        {},
        (err, encoded) => {
          if (err) {
            return reject(err);
          }

          return resolve(encoded);
        }
      );
    });
  }
}
