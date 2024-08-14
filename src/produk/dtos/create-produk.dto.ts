import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateProdukDto {
  @IsString()
  nama: string;

  @IsString()
  deskripsi: string;

  @IsNumber()
  harga: number;

  @IsString()
  gambar: string;

  @IsNumber()
  stok: number;

  @IsNumber()
  kategori: number;
}
