import { Kategori } from "src/kategori/kategori.entity";
import { Produk } from "src/produk/produk.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Keranjang{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Produk, (produk) => produk.keranjang, { eager: true })
    produk:Produk;
}