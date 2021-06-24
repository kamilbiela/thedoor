import { buildContainer, buildApp } from './buildApp';
import * as process from 'process';

const container = buildContainer({
  httpPort: parseInt(process.env.HTTP_PORT) || 8080,
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
});

const app = buildApp(container);

app.start().catch(x => console.error(x));
