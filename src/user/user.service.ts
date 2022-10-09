import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService implements UserInterface {
  constructor(private prismaService: PrismaService) {}

  async editUser(
    userId: number,
    editUserDto: EditUserDto,
  ): Promise<{
    user: User;
  }> {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...editUserDto,
      },
    });
    delete user.password;
    return { user };
  }
}
