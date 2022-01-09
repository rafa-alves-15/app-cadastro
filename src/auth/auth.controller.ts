import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginCredentialsDto } from './dto/auth-login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('/signup')
  singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
  
  @Post('/signin')
  singIn(@Body() authLoginCredentialsDto: AuthLoginCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.singIn(authLoginCredentialsDto);
  }
}
