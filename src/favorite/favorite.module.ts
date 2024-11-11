import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { FavoriteRepository } from './favorite.repository';

@Module({
  imports: [AlbumModule, TrackModule, ArtistModule],
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository],
})
export class FavoriteModule {}
