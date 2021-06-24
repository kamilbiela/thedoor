import { PrismaClient } from "@prisma/client/scripts/default-index";
import { UserService } from "./UserSerivce";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

describe('UserService', function() {
  let userService: UserService;
  let prismaClient: any;

  const prismaUser: User = {
    id: 'testid',
    username: 'email@localhost',
    password: '$2b$12$j2.swXrwzXe/H2.CA.LyG.cp0fpCX5QdiwDOX6hnLjxtMIk8uOaji',
  };

  beforeEach(function() {
    prismaClient = {
      user: {
        findFirst: () => prismaUser
      }
    };
    userService = new UserService(prismaClient, 'test');
  });

  describe('login', function() {
    it('should return user data without password property', async function() {
      const user = await userService.login('email@localhost', 'test');

      expect(prismaUser).toMatchObject(user);
      expect((user as any).password).toBeUndefined();
    });

    it('should return nothing when user password is invalid', async function() {
      const user = await userService.login('email@localhost', 'wrong password');
      expect(user).toBeUndefined();
    });

    it('should return nothing when user is not found', async function() {
      const localPrismaClient: any = {
        user: {
          findFirst: () => undefined
        }
      };

      const localUserService = new UserService(localPrismaClient, 'test');

      const user = await localUserService.login('email@localhost123', 'test');
      expect(user).toBeUndefined();
    });
  });

  describe('issueTokenForUser', function() {
    it('should return jwt token for passed user data without password', async function() {
      const userData = {
        id: 'testid',
        username: 'email@localhost',
      };

      const token = await userService.issueTokenForUser({...userData, password: 'test'} as any);
      const decoded = jwt.decode(token)

      expect(typeof token).toBe('string');
      expect(decoded).toMatchObject(userData);
    });
  });
})
