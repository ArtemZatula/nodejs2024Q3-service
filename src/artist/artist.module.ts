import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  imports: [
    AlbumModule,
    forwardRef(() => TrackModule),
    forwardRef(() => FavoriteModule),
  ],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistRepository],
})
export class ArtistModule {}
