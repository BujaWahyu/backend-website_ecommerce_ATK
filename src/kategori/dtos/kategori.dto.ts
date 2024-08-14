import { Expose } from "class-transformer";

export class KategoriDto{
    @Expose()
    id: number;

    @Expose()
    nama: string;

    @Expose()
    produk: number;
}