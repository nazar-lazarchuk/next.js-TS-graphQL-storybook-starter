import express from 'express';
import next from 'next';

// middlewares
import nextI18NextMiddleware from 'next-i18next/middleware';
import { slashTrim } from './middleware/slashTrim';
import { slushShortener } from './middleware/slushShortener';

import cors from 'cors';
import bodyParser from 'body-parser';
//
import nextI18next from '../utils/localization';

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(cors());
  server.use(bodyParser.json());

  server.use(nextI18NextMiddleware(nextI18next));

  // seo-setting to unify routing
  server.use(slashTrim);
  server.use(slushShortener);
  // server.use(urlToLower);

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
