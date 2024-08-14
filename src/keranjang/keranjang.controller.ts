import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { KeranjangService } from './keranjang.service';
import { CreateKeranjangDto } from './dtos/create-keranjang.dto';
import { Keranjang } from './keranjang.entity';

@Controller('keranjang')
export class KeranjangController {
    constructor(private keranjangService: KeranjangService) {}

    @Get()
    async findAll(): Promise<Keranjang[]> {
        return this.keranjangService.findAll();
    }

    @Post()
    create(@Body() body: CreateKeranjangDto): Promise<Keranjang> {
        return this.keranjangService.create(body);
    }

    @Delete('/:id')
    remove(@Param('id') id:string){
        return this.keranjangService.remove(parseInt(id));
    }
}
