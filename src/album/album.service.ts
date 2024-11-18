import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  async create({ name, year, artistId }: CreateAlbumDto) {
    try {
      return await this.albumRepository.save({ name, year, artistId });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      return await this.albumRepository.find();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException(`Album with Id ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return await this.albumRepository.save(album);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.albumRepository.delete(id);
  }
}
