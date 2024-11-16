import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { IsUniqueConstraint } from './validators/is-unique.validator';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, IsUniqueConstraint],
})
export class UserModule {}
