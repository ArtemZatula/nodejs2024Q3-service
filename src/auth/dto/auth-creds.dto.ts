import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredsDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
