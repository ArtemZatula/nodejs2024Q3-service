import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AlbumModule,
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
    TypeOrmModule.forFeature([Artist]),
    AuthModule,
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
