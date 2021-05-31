import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NiklibModule } from './niklib/niklib.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/niklib', {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    NiklibModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
