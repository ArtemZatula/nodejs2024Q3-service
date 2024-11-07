import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { PublicUser } from './types/user.interface';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<PublicUser> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<PublicUser[]> {
    return await this.userRepository.findAll();
  }

  async findById(id: string): Promise<PublicUser> {
    const found = await this.userRepository.findById(id);
    if (!found) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id);
    const isValidOldPassword = await this.userRepository.checkOldPassword(id, updateUserDto.oldPassword);
    if (!isValidOldPassword) {
      throw new BadRequestException('You typed invalid old password.')
    }
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    await this.findById(id);
    return await this.userRepository.remove(id);
  }
}

