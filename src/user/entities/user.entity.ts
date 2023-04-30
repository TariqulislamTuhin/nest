import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column({ nullable: false, name: 'first_name' })
  firstName: string;
  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ unique: true })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password: string;
}
