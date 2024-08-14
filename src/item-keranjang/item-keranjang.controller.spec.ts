import { Test, TestingModule } from '@nestjs/testing';
import { ItemKeranjangController } from './item-keranjang.controller';

describe('ItemKeranjangController', () => {
  let controller: ItemKeranjangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemKeranjangController],
    }).compile();

    controller = module.get<ItemKeranjangController>(ItemKeranjangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
