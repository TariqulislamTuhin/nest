import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Constant } from 'src/utils/constamts';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
  @Post('login')
  @HttpCode(200)
  login(@Body() LoginUserDto: LoginUserDto) {
    try {
      return this.userService.login(LoginUserDto);
    } catch (error) {
      throw new HttpException(
        Constant.COULD_NOT_CREATE_RESOURCES,
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
