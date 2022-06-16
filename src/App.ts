import dotenv from "dotenv";
import helmet from 'helmet';
import express from 'express';

interface Controller {
  path: string;
  router: express.Router;
}

export default class App {

  public app: express.Application;
  private controllers: Controller[];

  constructor(controllers: Controller[]) {
    dotenv.config();
    this.app = express();
    this.controllers = controllers;
    this.initializeHelmet();
    this.initializeMiddleware();
    this.initializeControllers();
    this.initializeNotFoundPage();
    this.initializeErrorHandling();
  }

  public async listen(): Promise<void> {
    const port = process.env.PORT;
    this.app.listen(port, () => {
      console.log(`Express server listening on port ${port}`);
    });
  }

  private initializeHelmet() {
    this.app.use(helmet());
  }

  private initializeMiddleware() {
    this.app.use(express.json());
  }

  private initializeControllers() {
    this.app.get('/api', (_, res) => {
      res.status(200).send('API works.');
    });
    this.controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeNotFoundPage() {
    this.app.use((_req, _res, next) => {
    });
  }

  private initializeErrorHandling() {
    // this.app.use();
  }
}