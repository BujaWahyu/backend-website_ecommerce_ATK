import { IsInt } from "class-validator";

export class CreateKeranjangDto{
    @IsInt()
    produk:number;
}