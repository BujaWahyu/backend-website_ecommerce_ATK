import { Controller, Post, Body, UseGuards, Patch, Param, Get, Query } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-items.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../iterceptors/serialize.interceptor';
import { ItemDto } from './dtos/item.dto';
import { ApprovedItemDto } from './dtos/approved-item.dto';
import { AdminGuard } from '../guards/admin.guard';
import { QueryItemDto } from './dtos/query-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService){}

    //Menampilkan daftar Item
    @Get()
    allItem(@Query() query: QueryItemDto){
        return this.itemsService.findAll(query)
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ItemDto)
    addItem(@Body() body: CreateItemDto, @CurrentUser() user:User){
        return this.itemsService.create(body, user);
    }

    //Membuat sebuat Approve item
    @Patch('/:id')
    @UseGuards(AdminGuard)
    ApproveItem(@Param('id') id: string, @Body() body: ApprovedItemDto){
        return this.itemsService.approveItem(parseInt(id), body.approved);
    }
}
