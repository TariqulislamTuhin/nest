import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Constant } from 'src/utils/constamts';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        Constant.COULD_NOT_CREATE_RESOURCES,
        HttpStatus.FORBIDDEN,
      );
    }
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
