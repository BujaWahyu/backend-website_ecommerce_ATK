import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { Produk } from './produk.entity';
import { CreateProdukDto } from './dtos/create-produk.dto';
import { Serialize } from 'src/iterceptors/serialize.interceptor';
import { ProdukDto } from './dtos/produk.dto';
import { QueryProdukDto } from './dtos/query-produk.dto';
import { UpdateProdukDto } from './dtos/update-produk';

@Controller('produk')
export class ProdukController {
    constructor(private produkService:ProdukService){}

    // Menampilkan semua data
    @Get()
    findAllUsers(@Query('nama') nama: string){
       return this.produkService.findAll(nama);
    }

    // Menampilkan produk berdasarkan id
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.produkService.findOneBy(parseInt(id))
    }

    // Membuat  data baru
    @Post()
    create(@Body() produk: CreateProdukDto): Promise<Produk> {
    return this.produkService.create(produk);
  }

   // Mengupdate data (hanya bisa di lakukan oleh admin)
   @Patch('/:id')
   update(@Param('id') id:string, body:UpdateProdukDto){
       return this.produkService.update(parseInt(id), body);
   }

   // Menghapus data (hanya bisa di lakukan oleh admin)
   @Delete('/:id')
   remove(@Param('id') id:string){
       return this.produkService.remove(parseInt(id));
   }
}
