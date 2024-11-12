import { IsEmail, MinLength } from 'class-validator';

export class SignInDto {

    nome: string;

    @IsEmail()
    email: string;

    @MinLength(10)
    password: string;
}