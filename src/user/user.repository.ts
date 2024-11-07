
import { Injectable } from '@nestjs/common';

import { PublicUser } from './types/user.interface';
import { UserEntity } from './entities/user.entity';
import { IUserRepository } from './types/user-repository.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  async findAll(): Promise<PublicUser[]> {
    return this.users.map(user => user.publicUser);
  }

  async findById(id: string): Promise<PublicUser | undefined> {
    return this.users.find(user => user.id === id)?.publicUser;
  }

  async findByLogin(login: string): Promise<PublicUser | undefined> {
    return this.users.find(user => user.login === login)?.publicUser;
  }

  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    const newUser = new UserEntity(createUserDto);
    this.users.push(newUser);
    return newUser.publicUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<PublicUser> {
    const found = this.users.find(user => user.id === id);
    found.updatePassword(updateUserDto.newPassword);
    return found.publicUser;
  }

  async remove(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }

  async isUniqueLogin(login): Promise<boolean> {
    return !this.users.some(user => user.login === login);
  }

  async checkOldPassword(id: string, pass: string): Promise<boolean> {
    const found = this.users.find(user => user.id === id);
    return found.isPassEqual(pass);
  }
}