import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
