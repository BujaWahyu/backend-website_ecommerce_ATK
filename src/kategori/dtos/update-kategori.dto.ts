import { IsOptional, IsString } from "class-validator";

export class UpdateKategoriDto{
    @IsString()
    @IsOptional()
    nama: string;
}