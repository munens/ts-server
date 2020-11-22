// packages:
import express, { RequestHandler } from 'express';

import Logger from './logger';

//middleware:
import cors from './middleware/cors';

// interfaces:
import { BaseModule, BaseLogger } from './interfaces';

export default class Application {

  private app: express.Application;
  private PORT: string;
  private dbUri: string;
  private dbName: string;
  private logger: BaseLogger;
  private middlewares: RequestHandler[];
  private modules: BaseModule[];

  constructor(appInit: {
    PORT: string;
    dbName: string;
    dbUri: string;
    modules: BaseModule[];
  }) {
    this.PORT = appInit.PORT;
    this.modules = appInit.modules;
    this.dbName = appInit.dbName;
    this.dbUri = appInit.dbUri;
    this.logger = new Logger();
    this.app = express();
  }

  public async init(): Promise<any> {
    this.initMiddlewares();
    this.initModules();
    this.initRoutes();
    this.listen();
  }

  private initModules(): void {
    this.modules
      .forEach((module) => module.initModule(this.logger));
  }

  initMiddlewares(): void {
    this.middlewares = [
      cors
    ];

    this.middlewares
      .forEach((middleware) => this.app.use(middleware));
  }

  initRoutes(): void {
    this.modules
      .map((module: BaseModule) => module.controller)
      .filter((controller) => controller)
      .forEach((controller) => this.app.use(`/${controller.baseRoute}`, controller.router));
  }

  private listen(): void {
    this.app.listen(
      this.PORT,
      // eslint-disable-next-line no-console
      () => console.log(`app listening at ${this.PORT || 8090}`)
    );
  }
}
