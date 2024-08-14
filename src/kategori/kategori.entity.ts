import { Produk } from "src/produk/produk.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Kategori{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nama: string;

    @OneToMany(()=>Produk, (produk)=>produk.kategori)
    produk: Produk[];
}