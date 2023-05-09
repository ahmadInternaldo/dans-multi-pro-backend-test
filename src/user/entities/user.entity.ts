import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';

@Entity('users')
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('varchar', { name: 'username', nullable: false, unique: true })
  username: string;

  @Column('text', { name: 'password', nullable: false })
  password: string;
}
