import { CreateTrackDto } from "./dto/create-track.dto";
import { UpdateTrackDto } from "./dto/update-track.dto";
import { TrackEntity } from "./entities/track.entity";
import { ITrackRepository } from "./types/track-repository.interface";
import { Track } from "./types/track.interface";

export class TrackRepository implements ITrackRepository {
  private tracks: Map<string, TrackEntity> = new Map();

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = new TrackEntity(createTrackDto);
    this.tracks.set(track.id, track);
    return track;
  }

  async findAll(): Promise<Track[]> {
    return [...this.tracks.values()];
  }
  
  async findById(id: string): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const found = this.tracks.get(id);
    found.albumId = updateTrackDto.albumId;
    return found;
  }

  async remove(id: string): Promise<void> {
    this.tracks.delete(id);
  }
}