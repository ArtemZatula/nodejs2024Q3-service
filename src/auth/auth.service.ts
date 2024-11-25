import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  getJwtSecret,
  getRefreshExpiryTime,
  getRefreshSecret,
  getSaltRounds,
  getTokenExpiryTime,
} from 'src/helpers/env';
import { hash } from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
      return await this.getTokens(user);
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async refreshToken({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const { userId: id } = await this.jwtService.verifyAsync(refreshToken, {
        secret: getRefreshSecret(),
      });
      const user = await this.userRepository.findOneBy({ id });
      if (user) {
        return await this.getTokens(user);
      }
    } catch {
      throw new ForbiddenException();
    }
  }

  private async getTokens({ login, id: userId }) {
    return {
      accessToken: await this.jwtService.signAsync(
        { login, userId },
        {
          secret: getJwtSecret(),
          expiresIn: getTokenExpiryTime(),
        },
      ),
      refreshToken: await this.jwtService.signAsync(
        { login, userId },
        {
          secret: getRefreshSecret(),
          expiresIn: getRefreshExpiryTime(),
        },
      ),
    };
  }
}
