import { IsString } from "class-validator";

export class CreateKategoriDto{
    @IsString()
    nama: string;
}