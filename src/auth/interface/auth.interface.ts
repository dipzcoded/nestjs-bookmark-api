import { SignInDto, SignUpDto } from '../dtos';

export interface AuthInterface {
  signUp(signUpDto: SignUpDto): Promise<{ accessToken: string }>;
  login(signInDto: SignInDto): Promise<{ accessToken: string }>;
}
