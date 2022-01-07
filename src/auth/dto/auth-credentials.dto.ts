import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/, { message: 'password is too weak' })
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  @MinLength(11)
  @MaxLength(14)
  @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, { message: 'CPF is invalid' })
  cpf: string;

  @IsEmail()
  email: string;
}