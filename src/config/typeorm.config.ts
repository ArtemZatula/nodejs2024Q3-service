import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { User } from 'src/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  entities: [User, Album, Artist],
  synchronize: true,
};
