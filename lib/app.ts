import 'express-async-errors';
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { IContainer } from 'bottlejs';
import { IProgram } from './types';
import methodOverride from 'method-override';

function createApp(
  container: IContainer,
  registerRouters: IProgram['registerRouters']
): Application {
  const { errorHandler, config } = container;
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({ origin: config?.auth?.corsAllowedOrigins, credentials: true }));
  app.use(helmet());
  app.use(methodOverride());
  registerRouters(app, container);
  if(errorHandler) {
    // TODO provide default
    app.use(errorHandler);
  }
  return app;
}

export default createApp;
