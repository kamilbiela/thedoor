import express from 'express';
import * as routes from './routes';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { Container } from './Container';
import {ValidationError as YupValidationError }from 'yup';
import cors from 'cors';

export class App {
  private app: express.Express;
  private server: http.Server;

  constructor(
    private container: Container,
  ) {}

  private configureRoutes(): void {
    if (!this.app) {
      throw new Error('this.app not initialized');
    }

    const publicRouter = express.Router();
    const userAuthRouter = express.Router();
    userAuthRouter.use(this.container.userAuthMiddleware);

    publicRouter
      .post('/api/auth/password', routes.postAuthLogin(
        this.container.userService
      ))
      .get('/api/services', routes.getServiceList(
        this.container.serviceService,
      ));

    userAuthRouter.put('/api/services/:serviceId/activate', routes.activateService(this.container.serviceService));

    // @todo configure cors to accept requests from specified origins
    this.app.use(cors());
    this.app.use(publicRouter);
    this.app.use(userAuthRouter);
  }

  private async initHttp(): Promise<void> {
    if (this.server) {
      throw new Error('Http server already initialized')
    }

    return new Promise(resolve => {
      this.app = express();
      this.app.use(bodyParser.json());

      this.configureRoutes();

      // @todo move to nicer place
      this.app.use(function catchYupErrors(err, req, res, next) {
        if (res.headersSent) {
          return next(err);
        }

        if (err instanceof YupValidationError) {
          return res.status(400).json(err);
        } else if (err) {
          console.error(err);
        }

        return next(err);
      })

      this.server = this.app.listen(this.container.config.httpPort, resolve);
    });
  }

  async stop(): Promise<void> {
    await new Promise(resolve => {
      if (!this.app) {
        return;
      }
      this.server.once('close', () => {
        resolve(void 0);
      });
      this.server.close();
    });

    await this.container.prismaClient.$disconnect();
  }

  async start(): Promise<void> {
    await this.initHttp();
    console.log(`Listening on ${this.container.config.httpPort}`)
  }
}
