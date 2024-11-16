import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsOptional()
  @IsUUID()
  artistId;

  @IsOptional()
  @IsUUID()
  albumId;

  @IsNotEmpty()
  @IsPositive()
  duration;
}
