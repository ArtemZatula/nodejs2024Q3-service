import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from './track.interface';

export interface ITrackRepository {
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | undefined>;
  create(createTrackDto: CreateTrackDto): Promise<Track>;
  update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track>;
  remove(id: string): Promise<boolean>;
}
