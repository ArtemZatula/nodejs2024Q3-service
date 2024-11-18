import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './types/track.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<ITrack> {
    try {
      return await this.trackRepository.save(createTrackDto);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findAll(): Promise<ITrack[]> {
    try {
      return await this.trackRepository.find();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string): Promise<ITrack> {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException(`Track with Id ${id} not found`);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    Object.assign(track, updateTrackDto);
    return await this.trackRepository.save(track);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.trackRepository.delete(id);
  }
}
