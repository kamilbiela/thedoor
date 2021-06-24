import * as express from 'express';
import { Config } from "./model/Config";
import { PrismaClient } from "@prisma/client";
import { ServiceService } from "./service/ServiceService";
import { UuidGenerator } from "./model/UuidGenerator";
import { UserService } from "./service/UserSerivce";

export interface Container {
  config: Config;
  uuidGen: UuidGenerator;
  serviceService: ServiceService;
  userService: UserService;
  userAuthMiddleware: express.RequestHandler;
  prismaClient: PrismaClient;
}
