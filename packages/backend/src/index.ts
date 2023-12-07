import path from "node:path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

import Fastify from 'fastify'
import FastifyStaticPlugin from '@fastify/static';

const app = Fastify();

// On handle uniquement le statique en production.
if (process.env.NODE_ENV === 'prod') {
  app.register(FastifyStaticPlugin, {
    root: path.join(__dirname, '../dist/public')
  });
}

app.listen({ port: 8000 }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.info(`Server is now listening on ${address}`);
});
