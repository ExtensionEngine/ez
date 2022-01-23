import * as dotenv from 'dotenv';
import { IProgram } from './types';
import { Provider } from './provider';

dotenv.config();

export default configure;

async function configure(provider: Provider, program: IProgram): Promise<void> {
  const createConfig = await import(`${process.cwd()}/src/config`);
  provider.factory('config', () => createConfig(process.env));
  program.configure(provider);
}
