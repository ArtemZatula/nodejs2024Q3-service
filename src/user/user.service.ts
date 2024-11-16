import {
  BadRequestException,
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

  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    const user = this.userRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
    });
    try {
      await this.userRepository.save(user);
      return user;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<PublicUser[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<PublicUser> {
    const found = await this.userRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['password'],
    });
    if (!user) {
      throw new NotFoundException('No User found');
    }
    const isValidOldPassword = user.password === updateUserDto.oldPassword;
    if (!isValidOldPassword) {
      throw new BadRequestException('Invalid old password');
    }
    user.password = updateUserDto.newPassword;
    user.version++;
    await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
