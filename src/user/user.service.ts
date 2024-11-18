import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicUser } from './types/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<PublicUser> {
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

  async findAll(): Promise<PublicUser[]> {
    return (await this.userRepository.find()).map(this.getPublicUser);
  }

  async findById(id: string): Promise<PublicUser> {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with Id = ${id} not found`);
    }
    return this.getPublicUser(found);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with Id = ${id} not found`);
    }
    if (!user.isValidOldPassword(updateUserDto.oldPassword)) {
      throw new BadRequestException('Invalid old password');
    }
    user.password = updateUserDto.newPassword;
    user.version++;
    await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }

  private getPublicUser(user: User): PublicUser {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...publicUser } = user;
    return publicUser;
  }
}
