import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { getJwtSecret, getSaltRounds } from 'src/helpers/env';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(authCredsDto: AuthCredsDto) {
    try {
      const user = {
        login: authCredsDto.login,
        password: await hash(authCredsDto.password, getSaltRounds()),
      };
      const created = await this.userRepository.save(user);
      return { id: created.id };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Login already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(authCredsDto: AuthCredsDto) {
    const user = await this.userRepository.findOneBy({
      login: authCredsDto.login,
    });
    const valid = user && user.validatePassword(authCredsDto.password);
    if (valid) {
      return {
        accessToken: await this.jwtService.signAsync(
          {
            login: authCredsDto.login,
            userId: user.id,
          },
          {
            secret: getJwtSecret(),
          },
        ),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
