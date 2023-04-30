import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ nullable: true })
  email: string;
  @ApiProperty({ nullable: true })
  username: string;
  @ApiProperty({ nullable: true })
  name: string;
}
