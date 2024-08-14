import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

    //Menampilkan seluruh data
    find(email:string){
        return this.usersRepository.find({
            where: {
                email,
            },
        })
    }

    //Membuat data baru
    async create(name: string, email:string, password: string, fotoProfil:string, alamat:string){
        const user = this.usersRepository.create({name, email, password, fotoProfil, alamat});
        await this.usersRepository.save(user);
        return user;
    }

    //Menampikan data berdasarkan id
    async findOneBy(id:number){
        const user = await this.usersRepository.findOneBy({id})

        if (!id){
            throw new NotFoundException('Session anda kosong')
        }
        if(!user){
            throw new NotFoundException('User Not Found')
        }

        return user;
    }

    //Mengupdate sebuah data
    async update(id: number, attrs: Partial<User>){
        const user = await this.findOneBy(id)
        Object.assign(user, attrs)
        return this.usersRepository.save(user)
    }

    //Menghapus data
    async remove(id:number){
        const user = await this.findOneBy(id)
        return this.usersRepository.remove(user)
    }
}
