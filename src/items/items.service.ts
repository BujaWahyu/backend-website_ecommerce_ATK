import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-items.dto';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { QueryItemDto } from './dtos/query-item.dto';

@Injectable()
export class ItemsService {
    constructor(@InjectRepository(Item) private itemRepository: Repository<Item>){}

    //Menampilkan seluruh Item
    findAll(queryItemDto:QueryItemDto){
        const query = this.itemRepository
            .createQueryBuilder()
            .select('*')
            .where('approved = :approved', {approved:true});

            if(queryItemDto.name){
                query.andWhere('name LIKE :name', {
                    name: `%${queryItemDto.name}%`,
                });
            }

            if(queryItemDto.location){
                query.andWhere('location LIKE :location', {
                    location: `%${queryItemDto.location}%`,
                });
            }

            if(queryItemDto.description){
                query.andWhere('description LIKE :description', {
                    description: `%${queryItemDto.description}%`,
                });
            }
        
            return query.getRawMany();
    }

    create(items: CreateItemDto, user: User){
        const item = this.itemRepository.create(items);
        item.user = user;
        return this.itemRepository.save(item);
    }

    //Membuat function service untuk approved
    async approveItem(id: number, approved: boolean){
        const item = await this.itemRepository.findOneBy({id})
        if(!item){
            throw new NotFoundException('Item Not Found Brother')
        }

        item.approved = approved;
        return this.itemRepository.save(item)
    }
}
