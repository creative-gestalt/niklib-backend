import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NiklibModule } from './niklib/niklib.module';
import { AuthService } from './auth/auth.service';

const url = 'localhost';
// const url = '192.168.1.250';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${url}/niklib`, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    NiklibModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
