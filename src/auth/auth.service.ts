import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthLoginCredentialsDto } from './dto/auth-login-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './user.repository';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService:JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.registerUser(authCredentialsDto);
  }

  async singIn(authLoginCredentialsDto: AuthLoginCredentialsDto,): Promise<{accessToken: string}> {
    const {username, password} = authLoginCredentialsDto;

    const user = await this.usersRepository.findOne({username});

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {username};
      const accessToken: string = this.jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
