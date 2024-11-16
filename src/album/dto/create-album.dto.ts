import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId;
}
