import { Expose, Transform } from "class-transformer";

export class ProdukDto{
    @Expose()
    id: number;

    @Expose()
    nama: string;

    @Expose()
    gambar: string;

    @Expose()
    harga: number;

    @Expose()
    deskripsi: string;

    @Transform(({obj}) => obj.kategori.id)
    @Expose()
    kategoriId: number
}