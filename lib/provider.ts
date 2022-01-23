import { IModule, MiddlewareConstructor } from './types';
import Bottle from 'bottlejs';

Bottle.config = { strict: true };

class Provider extends Bottle {
  registerModule(module: IModule): void {
    module.load(provider);
  }

  registerMiddleware(
    name: string,
    Middleware: MiddlewareConstructor,
    ...args: string[]
  ): void {
    this.serviceFactory(name, (...deps: any[]) => {
      const middleware = new Middleware(...deps);
      return middleware.handle;
    }, ...args);
  }
}

const provider = new Provider();

export default provider;
export { Provider };
