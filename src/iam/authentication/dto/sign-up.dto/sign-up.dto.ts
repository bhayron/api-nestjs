import { IsEmail, MinLength } from "class-validator";

export class SignUpDto {

  nome: string;

  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;
}