import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsBoolean()
  grammy;
}
