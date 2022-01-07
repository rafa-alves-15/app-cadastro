import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthLoginCredentialsDto {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/, { message: 'password is too weak' })
  password: string;

}