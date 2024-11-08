import { randomUUID } from "crypto";
import { CreateAlbumDto } from "../dto/create-album.dto";

export class AlbumEntity {
  id = randomUUID();
  name: string;
  year: number;
  artistId: string | null;

  constructor(createAlbumDto: CreateAlbumDto) {
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId;
  }
}
