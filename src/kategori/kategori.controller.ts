import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { KategoriService } from './kategori.service';
import { CreateKategoriDto } from './dtos/create-kategori.dto';
import { UpdateKategoriDto } from './dtos/update-kategori.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/iterceptors/serialize.interceptor';
import { KategoriDto } from './dtos/kategori.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('kategori')
// @UseGuards(AuthGuard)
// @Serialize(KategoriDto)
export class KategoriController {
    constructor(private kategoriService:KategoriService){}

    // Menampilkan data
    @Get()
    find(@Query('nama') nama:string){
        return this.kategoriService.find(nama);
    }

    // Menampilkan data berdasarkan id
    @Get('/:id')
    findOneBy(@Param('id') id:string){
        return this.kategoriService.findOneBy(parseInt(id));
    }

    // Membuat data baru (hanya bisa di lakukan oleh admin)
    @Post('/create_kategori')
    // @UseGuards(AdminGuard)
    create(@Body() body:CreateKategoriDto){
        return this.kategoriService.create(body.nama);
    }

    // Mengupdate data (hanya bisa di lakukan oleh admin)
    @Patch('/update_kategori/:id')
    // @UseGuards(AdminGuard)
    update(@Param('id') id:string, body:UpdateKategoriDto){
        return this.kategoriService.update(parseInt(id), body);
    }

    // Menghapus data (hanya bisa di lakukan oleh admin)
    @Delete('/delete_kategori/:id')
    // @UseGuards(AdminGuard)
    remove(@Param('id') id:string){
        return this.kategoriService.remove(parseInt(id));
    }
}
