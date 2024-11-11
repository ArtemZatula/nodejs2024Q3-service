import { randomUUID } from "node:crypto";
import { CreateTrackDto } from "../dto/create-track.dto";

export class TrackEntity {
  id = randomUUID();
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(createTrackDto: CreateTrackDto) {
    this.name = createTrackDto.name;
    this.artistId = createTrackDto.artistId;
    this.albumId = createTrackDto.albumId;
    this.duration =  createTrackDto.duration;
  }
}