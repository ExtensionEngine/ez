#!/usr/bin/env ts-node

import { Command } from 'commander';
import provider from './provider';

const cli = new Command();
run();

async function run() {
  const scripts = await import(`${process.cwd()}/src/scripts`).then(mod => mod.default);
  scripts.forEach((it: Command) => cli.addCommand(it));
  return cli.parseAsync(process.argv)
    .then(() => process.exit())
    .catch(error => {
      const { logger } = provider.container;
      logger.fatal(error);
      process.exit(1);
    });
}
