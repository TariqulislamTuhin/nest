import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AuthController],
  providers: [UserService],
})
export class UserModule {}
