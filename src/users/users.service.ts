import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialsDto } from '../auth/dto/auth-credetials.dto';
import { ConflictException } from '@nestjs/common';


// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async findOne(username: string): Promise<any> {
    const user = await this.userRepository.find({username});
    console.log('log user :: =>>>>>>>>>>>> ', user)
    return user;
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = bcrypt.hashSync("B4c0/\/", bcrypt.genSaltSync(10));
    try {
      // await user.save();
      console.log('User :: ', user);
    } catch (error) {
      throw new ConflictException(error.detail);
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}