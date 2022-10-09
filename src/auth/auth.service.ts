import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto } from './dtos';
import { AuthInterface } from './interface/auth.interface';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements AuthInterface {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    const alreadyExist = await this.prismaService.user.findUnique({
      where: {
        email: signUpDto.email,
      },
    });

    if (alreadyExist) {
      throw new ForbiddenException('credemtails already taken');
    }

    const hashPassword = await argon.hash(signUpDto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: signUpDto.email,
        password: hashPassword,
      },
    });

    const token = await this.signToken(newUser.id, newUser.email);

    return {
      accessToken: token,
    };
  }
  async login(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }

    if (!(await argon.verify(user.password, signInDto.password))) {
      throw new ForbiddenException('Invalid Credentials');
    }

    const token = await this.signToken(user.id, user.email);

    return {
      accessToken: token,
    };
  }

  signToken(userId: number, userEmail: string): Promise<string> {
    const payload = {
      sub: userId,
      email: userEmail,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '1hr',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
