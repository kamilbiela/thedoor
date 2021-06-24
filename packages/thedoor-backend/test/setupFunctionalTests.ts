import { App } from '../src/App'
import { buildContainer, buildApp} from '../src/buildApp';
import { execSync } from 'child_process';
import { Container } from '../src/Container';

let container: Container;
let app: App;

const resetDb = async (): Promise<void> => {
  execSync("dotenv -e .env.test -- npx prisma migrate reset --force");
  execSync("dotenv -e .env.test -- npx prisma migrate dev");
  execSync("dotenv -e .env.test -- node --require=ts-node/register bin/loadFixtures.ts");

  // @todo dump result to sql file and load it directly after first successfull run
};

beforeEach(async () => {
  try {
    if (app) {
      await app.stop();
    }
    // await resetDb();

    const httpPort = global['__PORT__'];

    container = buildContainer({
      httpPort,
      dbUrl: process.env.DB_URL,
      jwtSecret: process.env.JWT_SECRET,
    });

    app = new App(container);
    await app.start();
  } catch (e) {
    if (app) {
      return await app.stop();
    }
    console.error(e);
    throw e;
  }
});

afterEach(async function() {
  if (!app) {
    return;
  }
  return await app.stop();
});
