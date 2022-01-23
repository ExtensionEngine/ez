#!/usr/bin/env node

import configure from './configure';
import createApp from './app';
import createServer from './server';
import provider from './provider';

process.on('unhandledRejection', error => {
  throw error;
});

process.on('uncaughtException', error => {
  const { logger } = provider.container;
  if (logger) {
    logger.error(error);
  } else {
    console.error(error);
  }
  process.exit(1);
});

start();

async function start() {
  const main = await import(`${process.cwd()}/src/main`).then(mod => mod.default);
  configure(provider, main);
  provider.factory('app', container => createApp(container, main.registerRouters));
  provider.factory('server', createServer);
  if(!provider.container.logger) provider.value('logger', console);
  await main.beforeStart(provider.container);
  const { server, config } = provider.container;
  server.listen(config?.server?.port || 3000);
}
