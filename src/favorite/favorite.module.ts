import { forwardRef, Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorite.entity';
import { Track } from 'src/track/track.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/album/album.entity';

@Module({
  imports: [
    AlbumModule,
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    TypeOrmModule.forFeature([Album, Artist, Track, Favorite]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
