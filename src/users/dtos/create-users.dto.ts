import { IsEmail, IsNumber, IsPassportNumber, IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    fotoProfil: string;

    @IsString()
    alamat: string;
}