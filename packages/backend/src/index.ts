import 'dotenv/config';

import fs from "node:fs";
import path from "node:path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

import Fastify, { type FastifyInstance } from 'fastify'
import FastifyStaticPlugin from '@fastify/static';
import FastifyCookiePlugin from '@fastify/cookie';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

import { initializeDatabase } from "./database/index.js";
import auth from "./routes/auth/index.js";
import articles from "./routes/articles/index.js";
import comments from "./routes/comments/index.js";

initializeDatabase();
let app: FastifyInstance;

if (process.env.NODE_ENV === 'prod') {
  app = Fastify({
    logger: true,
    https: {
      key: fs.readFileSync(path.join(__dirname, '..', 'nuit-info.dev-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '..', 'nuit-info.dev.pem'))
    } 
  })
}
else {
  app = Fastify()
}

app.withTypeProvider<TypeBoxTypeProvider>()
app.setErrorHandler(function (error, request, reply) {
  // On affiche les erreurs de validation.
  if (error.validation) {
    reply.status(400).send(new Error("Des propriétés sont manquantes ou invalides."))
  }

  reply.send(error);
})

// On handle uniquement le statique en production.
if (process.env.NODE_ENV === 'prod') {
  app.register(FastifyStaticPlugin, {
    root: path.join(__dirname, '../dist/public')
  });
}

app.register(FastifyCookiePlugin, {
  secret: process.env.COOKIE_SECRET as string
});

// On enregistre les routes.
app.post('/api/auth/register', auth.register);
app.post('/api/auth/login', auth.login);
app.get('/api/auth/check', auth.check);
app.get('/api/auth/logout', auth.logout);
app.post('/api/articles/create', articles.create);
app.post('/api/articles/patch', articles.patch);
app.post('/api/articles/read', articles.read);
app.post('/api/articles/delete', articles.delete);
app.post('/api/articles/page', articles.page);
app.post('/api/comments/page', comments.page);
app.post('/api/comments/write', comments.write);
app.post('/api/comments/delete', comments.delete);

app.listen({ port: process.env.NODE_ENV === 'prod' ? 443 : 8000 }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }

  console.info(`Server is now listening on ${address}`);
});
