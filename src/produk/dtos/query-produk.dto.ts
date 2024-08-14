import { Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class QueryProdukDto{

    @IsString()
    nama: string;

    @IsString()
    deskripsi: string;
}