import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpDto, SignInDto } from './dtos';
import { AuthInterface } from './interface/auth.interface';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(private prismaService: PrismaService) {}

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const alreadyExist = await this.prismaService.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (alreadyExist) {
      throw new ForbiddenException('user already exists!');
    }

    const hashPassword = await argon.hash(signUpDto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: signUpDto.email,
        password: hashPassword,
      },
    });

    delete newUser.password;

    return 'sign up successful';
  }
  async login(signInDto: SignInDto): Promise<string> {
    return 'sign in';
  }
}
