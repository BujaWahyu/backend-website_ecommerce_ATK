import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kategori } from './kategori.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KategoriService {
    constructor(@InjectRepository(Kategori) private kategoriRepository: Repository<Kategori>){}

    // Menampilkan data
    find(nama:string){
        return this.kategoriRepository.find({
            where:{
                nama,
            }
        })
    }

    // Menampilkan data berdasarkan id
    async findOneBy(id:number){
        const kategori = await this.kategoriRepository.findOneBy({id});

        if(!kategori){
            throw new NotFoundException("Id Kategori tidak terdftar");
        }

        return kategori;
    }
    
    // Membuat data baru
    async create(nama:string){
        const kategori = this.kategoriRepository.create({nama})
        await this.kategoriRepository.save(kategori)
        return kategori
    }

    // Mengupdate data
    async update(id:number, attrs: Partial<Kategori>){
        const kategori = await this.findOneBy(id)

        if(!kategori){
            throw new NotFoundException("Kategori tidak ditemukan")
        }

        Object.assign(kategori, attrs)
        return this.kategoriRepository.save(kategori)
    }

    // Menghapus data
    async remove(id:number){
        const kategori = await this.findOneBy(id)

        if(!kategori){
            throw new NotFoundException("Kategori tidak di temukan")
        }

        return this.kategoriRepository.remove(kategori)
    }
}
