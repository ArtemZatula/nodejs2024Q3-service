import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IPublicUser } from './types/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<IPublicUser> {
    try {
      const user = await this.userRepository.save({ login, password });
      return this.getPublicUser(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Login already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<IPublicUser[]> {
    return (await this.userRepository.find()).map(this.getPublicUser);
  }

  private async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with Id = ${id} not found`);
    }
    return user;
  }

  async findById(id: string): Promise<IPublicUser> {
    const user = await this.findUserById(id);
    return this.getPublicUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IPublicUser> {
    const user = await this.findUserById(id);
    if (!user.isValidOldPassword(updateUserDto.oldPassword)) {
      throw new ForbiddenException('Invalid old password');
    }
    user.password = updateUserDto.newPassword;
    user.version++;
    try {
      const saved = await this.userRepository.save(user);
      return this.getPublicUser(saved);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string): Promise<void> {
    await this.findUserById(id);
    await this.userRepository.delete(id);
  }

  private getPublicUser(user: User): IPublicUser {
    const { id, login, version } = user;

    return {
      id,
      login,
      version,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
