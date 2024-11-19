import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Favorite } from 'src/favorite/favorite.entity';
import { getDbConfigs } from 'src/helpers/env';
import { Track } from 'src/track/track.entity';
import { User } from 'src/user/user.entity';

const { host, port, username, password, database, synchronize } =
  getDbConfigs();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize,
  entities: [User, Album, Artist, Track, Favorite],
};
