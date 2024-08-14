import { Module } from '@nestjs/common';
import { ItemKeranjangService } from './item-keranjang.service';
import { ItemKeranjangController } from './item-keranjang.controller';

@Module({
  providers: [ItemKeranjangService],
  controllers: [ItemKeranjangController]
})
export class ItemKeranjangModule {}
