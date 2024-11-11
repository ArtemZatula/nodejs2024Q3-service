import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/track/:id')
  @UsePipes(ValidationPipe)
  async addTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addTrackToFavs(id);
  }

  @Delete('/track/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async removeTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeTrackFromFavs(id);
  }

  @Post('/artist/:id')
  @UsePipes(ValidationPipe)
  async addArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addArtistToFavs(id);
  }

  @Delete('/artist/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async removeArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeArtistFromFavs(id);
  }

  @Post('/album/:id')
  @UsePipes(ValidationPipe)
  async addAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.addAlbumToFavs(id);
  }

  @Delete('/album/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(204)
  async removeAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoriteService.removeAlbumFromFavs(id);
  }

  @Get()
  async findAll() {
    return this.favoriteService.findAll();
  }
}
