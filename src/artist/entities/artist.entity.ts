import { randomUUID } from 'crypto';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class ArtistEntity {
  id = randomUUID();
  name: string;
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
  }
}
