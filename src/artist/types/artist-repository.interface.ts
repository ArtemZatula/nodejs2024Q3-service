import { CreateArtistDto } from "../dto/create-artist.dto";
import { UpdateArtistDto } from "../dto/update-artist.dto";
import { Artist } from "./artist.interface";

export interface IArtistRepository {
  findAll(): Promise<Artist[]>;
  findById(id: string): Promise<Artist | undefined>;
  create(createTrackDto: CreateArtistDto): Promise<Artist>;
  update(id: string, updateTrackDto: UpdateArtistDto): Promise<Artist>;
  remove(id: string): Promise<boolean>;
} 
