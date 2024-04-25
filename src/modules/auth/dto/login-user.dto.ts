import { IsEmail, MaxLength, MinLength } from 'class-validator/esm2015';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
