import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as http from 'http';
import express from 'express';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = [
    'https://gestaltarchive.com',
    'https://resources-lib.gestaltarchive.com',
    'http://localhost:8080',
  ];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.enableCors(corsOptions);
  // await app.listen(process.env.PORT || 3000);
  const server = express();
  await app.init();
  http.createServer(server).listen(3000);
  https.createServer(server).listen(443);
}
bootstrap();
