// import { Controller, Request, Post, UseGuards,  } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { LocalAuthGuard } from './auth/local-auth.guard';

// @Controller()
// export class AppController {
//   // @UseGuards(AuthGuard('local'))
//   // @Post('auth/login')
//   // async login(@Request() req) {
//   //   return req.user;
//   // }

//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Request() req) {
//     return req.user;
//   }

// }
import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AuthCredentialsDto } from './auth/dto/auth-credetials.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Post('signup')
  // async signup(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}