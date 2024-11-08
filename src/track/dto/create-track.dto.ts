import { IsNotEmpty } from "class-validator";

export class CreateTrackDto {
  @IsNotEmpty()
  name;

  artistId;
  albumId;

  @IsNotEmpty()
  duration;
}
