import { randomUUID } from 'node:crypto';
import { PublicUser } from '../types/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserEntity {
  id = randomUUID();
  login: string;
  #password: string;
  version = 0;
  createdAt: number;
  updatedAt: number;

  constructor(createUserDto: CreateUserDto) {
    this.login = createUserDto.login;
    this.#password = createUserDto.password;
    const timestamp = Date.now();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }

  get publicUser(): PublicUser {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updatePassword(newPassword: string): void {
    this.#password = newPassword;
    this.version++
  }

  isPassEqual(newPassword: string): boolean {
    return this.#password === newPassword;
  }
}
