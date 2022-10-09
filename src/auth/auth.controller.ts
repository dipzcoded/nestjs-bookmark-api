import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ accessToken: string }> {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.login(signInDto);
  }
}
