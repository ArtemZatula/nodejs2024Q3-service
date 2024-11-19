import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/track/:id')
  async addTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeTrackFromFavs(id);
  }

  @Post('/artist/:id')
  async addArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeArtistFromFavs(id);
  }

  @Post('/album/:id')
  async addAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeAlbumFromFavs(id);
  }

  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }
}
