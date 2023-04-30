import { genSalt, hash, compare } from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constant } from 'src/utils/constamts';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.usersRepository.findOne({
      where: [
        { email: createUserDto.email },
        { username: createUserDto.username },
      ],
    });
    if (userExists)
      throw new HttpException(
        Constant.USER_ALREADY_EXISTS,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async login(loginUserDto: LoginUserDto) {
    const userExists = await this.usersRepository.findOne({
      where: [{ email: loginUserDto.email }, { username: loginUserDto.email }],
      select: {
        email: true,
        username: true,
        password: true,
      },
    });

    if (!userExists) {
      throw new HttpException(Constant.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    console.log(loginUserDto, userExists);
    const match = await compare(loginUserDto.password, userExists.password);
    if (!match)
      throw new HttpException(
        Constant.INVALID_CREDENTIALS,
        HttpStatus.NOT_FOUND,
      );
    return HttpStatus.OK;
  }

  async hashPassword(password: string) {
    const salt = await genSalt();
    return await hash(password, salt);
  }
  async verifyPassword() { }
}
