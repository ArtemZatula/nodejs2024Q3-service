import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './track.repository';
import { Track } from './types/track.interface';

@Injectable()
export class TrackService {
  constructor(private trackRepository: TrackRepository) {}
  
  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.trackRepository.create(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const found = await this.trackRepository.findById(id);
    if (!found) {
      throw new NotFoundException(`Track with Id ${id} not found`);
    }
    return found;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const updated = await this.trackRepository.update(id, updateTrackDto);
    if (!updated) {
      throw new NotFoundException(`Track with Id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.trackRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Track with Id ${id} not found`);
    }
    return deleted;
  }
}
