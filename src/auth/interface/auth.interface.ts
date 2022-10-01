import { SignInDto, SignUpDto } from '../dtos';

export interface AuthInterface {
  signUp(signUpDto: SignUpDto): Promise<string>;
  login(signInDto: SignInDto): Promise<string>;
}
