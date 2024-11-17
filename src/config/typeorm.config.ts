import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [User],
  synchronize: true,
};
