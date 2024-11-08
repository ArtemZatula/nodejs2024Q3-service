import { IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsUUID()
  artistId;

  @IsOptional()
  @IsUUID()
  albumId;

  @IsOptional()
  @IsPositive()
  duration;
}
