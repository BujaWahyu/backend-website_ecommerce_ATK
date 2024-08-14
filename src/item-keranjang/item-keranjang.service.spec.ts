import { Test, TestingModule } from '@nestjs/testing';
import { ItemKeranjangService } from './item-keranjang.service';

describe('ItemKeranjangService', () => {
  let service: ItemKeranjangService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemKeranjangService],
    }).compile();

    service = module.get<ItemKeranjangService>(ItemKeranjangService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
