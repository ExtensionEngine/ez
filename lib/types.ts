import { Application, NextFunction, Request, Response  } from 'express';
import { IContainer } from 'bottlejs';
import { Provider } from './provider';
import { HttpError } from 'http-errors';

type ServiceConstructor<T> = { new(...args: any[]): T; };

export type MiddlewareConstructor = ServiceConstructor<IMiddleware | IErrorMiddleware>;

export interface IModule {
  load(provider: Provider): void;
}

export interface IProgram {
  configure(provider: Provider): void;
  beforeStart(container: IContainer): Promise<void>;
  registerRouters: (app: Application, container: IContainer) => void;
}

export interface IErrorMiddleware {
  handle(
    err: HttpError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> | Response;
}

export interface IMiddleware {
  handle(
    req: Request,
    res: Response,
    next: NextFunction,
    id?: string
  ): Promise<void> | void;
}

