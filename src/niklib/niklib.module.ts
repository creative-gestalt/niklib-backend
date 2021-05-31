import { Module } from '@nestjs/common';
import { NiklibService } from './niklib.service';
import { NiklibController } from './niklib.controller';
import { NiklibSchema } from './schemas/niklib.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: NiklibSchema }]),
    MulterModule.register({ dest: './files' }),
  ],
  providers: [NiklibService, AuthService],
  controllers: [NiklibController],
})
export class NiklibModule {}
