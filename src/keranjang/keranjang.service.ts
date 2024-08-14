import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Keranjang } from './keranjang.entity';
import { Repository } from 'typeorm';
import { ProdukService } from 'src/produk/produk.service';
import { CreateKeranjangDto } from './dtos/create-keranjang.dto';

@Injectable()
export class KeranjangService {
    constructor(@InjectRepository(Keranjang) private keranjangRepository:Repository<Keranjang>,
                 private produkService: ProdukService,){}

    //Menampilkan semua data
    async findAll(): Promise<Keranjang[]> {
        return this.keranjangRepository.find({ relations: ['produk'] });
    }

    async findOneBy(id:number){
        const keranjang = await this.keranjangRepository.findOneBy({id})

        if (!id){
          throw new NotFoundException('Session anda kosong')
        }
        if(!keranjang){
          throw new NotFoundException('Keranjang Not Found')
        }

        return keranjang;
    }
    
    // Membuat Data Keranjang Baru
    async create(body: CreateKeranjangDto): Promise<Keranjang> {
        const produk = await this.produkService.findOneBy(body.produk);
            
        if (!produk) {
            throw new NotFoundException('Produk not found');
        }
            
        const keranjang = this.keranjangRepository.create({
            produk});
            
        return this.keranjangRepository.save(keranjang);
    }

    async remove(id:number){
        const keranjang = await this.findOneBy(id)

        if(!keranjang){
            throw new NotFoundException("Keranjang tidak di temukan")
        }

        return this.keranjangRepository.remove(keranjang)
    }
}
