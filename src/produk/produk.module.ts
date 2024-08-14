import { Module } from '@nestjs/common';
import { ProdukService } from './produk.service';
import { ProdukController } from './produk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produk } from './produk.entity';
import { KategoriService } from 'src/kategori/kategori.service';
import { KategoriModule } from 'src/kategori/kategori.module';

@Module({
  imports: [TypeOrmModule.forFeature([Produk]), KategoriModule],
  providers: [ProdukService],
  controllers: [ProdukController],
  exports: [ProdukService],
})
export class ProdukModule {}
