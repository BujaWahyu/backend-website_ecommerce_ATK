import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Produk } from './produk.entity';
import { Repository } from 'typeorm';
import { Kategori } from 'src/kategori/kategori.entity';
import { CreateProdukDto } from './dtos/create-produk.dto';
import { KategoriService } from 'src/kategori/kategori.service';
import { ProdukDto } from './dtos/produk.dto';
import { QueryProdukDto } from './dtos/query-produk.dto';

@Injectable()
export class ProdukService {
    constructor(@InjectRepository(Produk) private produkRepository:Repository<Produk>,
                private readonly kategoriService: KategoriService,){}

    // Menampilkan file produk
    findAll(nama:string){
      return this.produkRepository.find({
          where: {
              nama,
          },
      })
  }

    // Menampilkan produk berdasarkan id
    async findOneBy(id:number){
      const user = await this.produkRepository.findOneBy({id})

      if (!id){
          throw new NotFoundException('Session anda kosong')
      }
      if(!user){
          throw new NotFoundException('User Not Found')
      }

      return user;
    }

    // membuat data baru
    async create(body: CreateProdukDto): Promise<Produk> {
        const kategori = await this.kategoriService.findOneBy(body.kategori);
        if (!kategori) {
          throw new NotFoundException('Kategori not found');
        }
        const produk = this.produkRepository.create({ ...body, kategori });
        return this.produkRepository.save(produk);
    }

    // Update data
    async update(id:number, attrs: Partial<Produk>){
        const produk = await this.findOneBy(id)

        if(!produk){
            throw new NotFoundException("Produk tidak ditemukan")
        }

        Object.assign(produk, attrs)
        return this.produkRepository.save(produk)
    }

    async remove(id:number){
        const produk = await this.findOneBy(id)

        if(!produk){
            throw new NotFoundException("Produk tidak di temukan")
        }

        return this.produkRepository.remove(produk)
    }
}
