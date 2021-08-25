
// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

// @Injectable()
// export class AuthService {
//   constructor(private usersService: UsersService) {}

//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(username);
//     if (user && user.password === pass) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }
// }

import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { use } from 'passport';
import { AuthCredentialsDto } from './dto/auth-credetials.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string){
    const userObj = await this.usersService.findOne(username);
    const user = userObj[0];
    console.log('Log Data :: =>>>>>>>>>>>>> :::  ', user);
    if (user && user.password === password) {
      console.log('IF part ::: ');
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    console.log('Payload ::: =>>>>>>>>>>>>> :: ', payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersService.signUp(authCredentialsDto);
  }
}