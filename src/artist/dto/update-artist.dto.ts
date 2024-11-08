import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name;

  @IsOptional()
  @IsBoolean()
  grammy;

}
