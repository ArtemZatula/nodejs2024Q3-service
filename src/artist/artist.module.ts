import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository]
})
export class ArtistModule {}
