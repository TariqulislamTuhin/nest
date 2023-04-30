import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

@ApiExtraModels(User)
export class CreateUserDto {
  @IsNotEmpty({ message: 'First name is required' })
  @ApiProperty()
  firstName: string;
  @IsNotEmpty({ message: 'Last name is required' })
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty()
  confirmPassword: string;
}
