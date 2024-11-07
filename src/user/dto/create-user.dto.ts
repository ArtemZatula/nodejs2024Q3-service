import { IsNotEmpty, IsString } from "class-validator";
import { IsUnique } from "../validators/is-unique.validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsUnique()
  login: string;

  @IsNotEmpty()
  password: string;
}
