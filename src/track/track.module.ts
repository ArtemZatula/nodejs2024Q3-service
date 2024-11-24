import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavoriteModule } from 'src/favorite/favorite.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [FavoriteModule, TypeOrmModule.forFeature([Track]), AuthModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
