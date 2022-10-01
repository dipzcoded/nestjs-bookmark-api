import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe() {
    return 'user info';
  }
}
