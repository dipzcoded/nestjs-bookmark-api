import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignUpDto {
  // @IsNotEmpty()
  // @IsString()
  // fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
