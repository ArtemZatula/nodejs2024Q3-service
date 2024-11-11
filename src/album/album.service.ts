import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { TrackRepository } from 'src/track/track.repository';
import { FavoriteRepository } from 'src/favorite/favorite.repository';

@Injectable()
export class AlbumService {
  constructor(
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.create(createAlbumDto);
  }

  async findAll() {
    return this.albumRepository.findAll();
  }

  async findOne(id: string) {
    const found = await this.albumRepository.findById(id);
    if (!found) {
      throw new NotFoundException(`Album with Id ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updated = await this.albumRepository.update(id, updateAlbumDto);
    if (!updated) {
      throw new NotFoundException(`Album with Id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.albumRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Album with Id ${id} not found`);
    }
    await this.trackRepository.removeTrackAlbum(id);
    await this.favoriteRepository.removeAlbumFromFavs(id);
    return deleted;
  }
}
