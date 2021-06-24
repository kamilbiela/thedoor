import { App } from "./App"
import { Config } from "./model/Config";
import { Container } from "./Container";
import * as _ from 'lodash';
import { ServiceService } from "./service/ServiceService";
import { PrismaClient } from "@prisma/client";
import { v4 } from 'uuid';
import { UserService } from "./service/UserSerivce";
import { isUserAuthentiactedMiddleware } from "./service/isUserAuthenticatedMiddleware";

export const buildContainer = (config: Config): Container => {
  const uuidGen = v4;
  const prismaClient = new PrismaClient();
  const serviceService = new ServiceService(prismaClient, uuidGen);
  const userService = new UserService(prismaClient, config.jwtSecret);
  const userAuthMiddleware = isUserAuthentiactedMiddleware(userService, config.jwtSecret);

  return {
    config,
    serviceService,
    prismaClient,
    userService,
    uuidGen,
    userAuthMiddleware,
  };
}

export const buildApp = (container: Container): App => {
  return new App(container);
}
