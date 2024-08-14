import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Item } from './items/item.entity'
import { AuthModule } from './auth/auth.module';
import { KeranjangModule } from './keranjang/keranjang.module';
import { ProdukModule } from './produk/produk.module';
import { KategoriModule } from './kategori/kategori.module';
import { ItemKeranjangModule } from './item-keranjang/item-keranjang.module';
import { Kategori } from './kategori/kategori.entity';
import { Produk } from './produk/produk.entity';
import { Keranjang } from './keranjang/keranjang.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:'db.sqlite',
      entities: [User, Item, Kategori, Produk, Keranjang],
      synchronize: true,
    }),
    UsersModule, ItemsModule, AuthModule, KeranjangModule, ProdukModule, KategoriModule, ItemKeranjangModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
