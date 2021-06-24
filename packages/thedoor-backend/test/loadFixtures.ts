import * as path from 'path';
import { Builder, fixturesIterator, Loader, Parser, Resolver } from '@getbigger-io/prisma-fixtures-cli';
import { PrismaClient } from '@prisma/client';

export const loadFixtures = async (fixturesPath: string) => {
  let connection: PrismaClient;

  try {
    connection = new PrismaClient();
    await connection.$connect();

    const loader = new Loader();
    loader.load(path.resolve(fixturesPath));

    const resolver = new Resolver();
    const fixtures = resolver.resolve(loader.fixtureConfigs);
    const builder = new Builder(connection, new Parser());

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture);
    }
  } catch (err) {
    throw err;
  } finally {
    if (connection) {
      await connection.$disconnect();
    }
  }
};
