import { Kategori } from "src/kategori/kategori.entity";
import { Keranjang } from "src/keranjang/keranjang.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produk{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nama: string;

    @Column()
    deskripsi: string;

    @Column()
    harga: number;

    @Column()
    gambar: string;

    @Column()
    stok:number;

    @ManyToOne(()=> Kategori, (kategori) => kategori.produk, { eager: true })
    kategori:Kategori;

    @OneToMany(()=>Keranjang, (keranjang)=>keranjang.produk)
    keranjang:Keranjang;
}