import { IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsPositive()
  year;

  @IsOptional()
  @IsUUID()
  artistId
}
