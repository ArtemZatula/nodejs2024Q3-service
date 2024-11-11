import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { Artist } from './types/artist.interface';
import { AlbumRepository } from 'src/album/album.repository';
import { TrackRepository } from 'src/track/track.repository';
import { FavoriteRepository } from 'src/favorite/favorite.repository';

@Injectable()
export class ArtistService {
  constructor(
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
    private favoriteRepository: FavoriteRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.artistRepository.create(createArtistDto);
  }

  async findAll() {
    return this.artistRepository.findAll();
  }

  async findOne(id: string): Promise<Artist> {
    const found = await this.artistRepository.findById(id);
    if (!found) {
      throw new NotFoundException(`Artist with Id ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const updated = await this.artistRepository.update(id, updateArtistDto);
    if (!updated) {
      throw new NotFoundException(`Artist with Id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.artistRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Artist with Id ${id} not found`);
    }
    await this.albumRepository.removeAlbumArtist(id);
    await this.trackRepository.removeTrackArtist(id);
    await this.favoriteRepository.removeArtistFromFavs(id);
    return deleted;
  }
}
