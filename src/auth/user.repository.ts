import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  
  async registerUser(authCredentialsDto:AuthCredentialsDto): Promise<void>{
    const {username, password, name, surname, cpf, email} = authCredentialsDto;
    
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({username, password: hashedPassword, name, surname, cpf, email});
    
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing User');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}