import { ApiProperty } from '@nestjs/swagger';
import { UserInterface } from '../interfaces/user.interface';
import { IsNotEmpty } from 'class-validator';

/**
 * username: admin
 * password: admin
 * hash_password: $2y$10$CCsSrzcd0nMfJho3Zc2cpuyPHGllSYhdAabdCWpiQyL82gnWSw5MC
 */
export class LoginDto implements UserInterface {
  @ApiProperty({
    name: 'username',
    type: String,
    default: 'admin',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    name: 'password',
    type: String,
    default: 'admin',
  })
  @IsNotEmpty()
  password: string;
}
