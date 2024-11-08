import { CreateTrackDto } from "../dto/create-track.dto";
import { UpdateTrackDto } from "../dto/update-track.dto";
import { Track } from "./track.interface";

export interface ITrackRepository {
  findAll(): Promise<Track[]>;
  findById(id: string): Promise<Track | undefined>;
  create(user: CreateTrackDto): Promise<Track>;
  update(id: string, user: UpdateTrackDto): Promise<Track>;
  remove(id: string): Promise<void>;
} 
