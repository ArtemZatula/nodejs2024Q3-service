import { CreateArtistDto } from "./dto/create-artist.dto";
import { UpdateArtistDto } from "./dto/update-artist.dto";
import { ArtistEntity } from "./entities/artist.entity";
import { IArtistRepository } from "./types/artist-repository.interface";
import { Artist } from "./types/artist.interface";

export class ArtistRepository implements IArtistRepository {
  private artists: Map<string, ArtistEntity> = new Map();

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = new ArtistEntity(createArtistDto);
    this.artists.set(artist.id, artist);
    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return [...this.artists.values()];
  }

  async findById(id: string): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const found = this.artists.get(id);
    if (!found) return;
    Object.assign(found, updateArtistDto);
    return found;
  }

  async remove(id: string): Promise<boolean> {
    return this.artists.delete(id);
  }
}