import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { FavoriteModule } from 'src/favorite/favorite.module';

@Module({
  imports: [FavoriteModule],
  controllers: [TrackController],
  providers: [TrackService, TrackRepository],
  exports: [TrackRepository],
})
export class TrackModule {}
