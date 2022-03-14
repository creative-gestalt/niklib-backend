import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller('auth')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async ping(@Res() res) {
    return res.status(HttpStatus.OK).json();
  }

  @Post('login')
  async verifyUser(@Res() res, @Body() body: Record<string, string>) {
    const valid = await this.authService.verifyUser(body.token);
    return res.status(HttpStatus.OK).json(valid);
  }

  @Post('logout')
  async invalidateUser(@Res() res, @Body() body: Record<string, string>) {
    const invalid = await this.authService.invalidateUser(body.token);
    return res.status(HttpStatus.OK).json(invalid);
  }

  @Post('userCheck')
  async checkUserSignUp(@Res() res, @Body() data: Record<string, string>) {
    const accepted = await this.authService.checkUser(data.user);
    if (!accepted) throw new NotAcceptableException('User not allowed!');
    return res.status(HttpStatus.OK).json({
      message: 'User is accepted',
      accepted: accepted,
    });
  }
}
