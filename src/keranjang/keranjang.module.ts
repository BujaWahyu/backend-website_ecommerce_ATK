import { Module } from '@nestjs/common';
import { KeranjangService } from './keranjang.service';
import { KeranjangController } from './keranjang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keranjang } from './keranjang.entity';
import { ProdukModule } from 'src/produk/produk.module';

@Module({
  imports: [TypeOrmModule.forFeature([Keranjang]), ProdukModule],
  providers: [KeranjangService],
  controllers: [KeranjangController]
})
export class KeranjangModule {}
