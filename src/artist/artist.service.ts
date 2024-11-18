import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoriteRepository } from 'src/favorite/favorite.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    // private trackRepository: TrackRepository,
    // private favoriteRepository: FavoriteRepository,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      return await this.artistRepository.save(createArtistDto);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.artistRepository.find();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException(`Artist with Id ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return await this.artistRepository.save(artist);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.artistRepository.delete(id);
    // await this.albumRepository.removeAlbumArtist(id);
    // await this.trackRepository.removeTrackArtist(id);
    // await this.favoriteRepository.removeArtistFromFavs(id);
  }
}
