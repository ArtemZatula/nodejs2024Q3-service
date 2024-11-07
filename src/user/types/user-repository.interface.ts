import { PublicUser } from './user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserRepository {
  findAll(): Promise<PublicUser[]>;
  findById(id: string): Promise<PublicUser | undefined>;
  findByLogin(login: string): Promise<PublicUser | undefined>;
  create(user: CreateUserDto): Promise<PublicUser>;
  update(id: string, user: UpdateUserDto): Promise<PublicUser>;
  remove(id: string): Promise<void>;
}