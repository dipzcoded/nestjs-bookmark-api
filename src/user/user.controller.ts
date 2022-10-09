import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
// import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() userId: User) {
    return userId;
  }

  @Patch('/')
  editUser(
    @GetUser('id') userId: number,
    @Body() editUserDto: EditUserDto,
  ): Promise<{ user: User }> {
    return this.userService.editUser(userId, editUserDto);
  }
}
