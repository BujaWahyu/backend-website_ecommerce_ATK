    import { 
    Controller, 
    Post, 
    Body, 
    Get, 
    Patch, 
    Param, 
    Query, 
    Delete,  
    ClassSerializerInterceptor, 
    Session,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from '../iterceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('users')
//Menggunakan interceptornya secara global di controller
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService){}

    //Menampilkan seluruh data
    @Get()
    findAllUsers(@Query('email') email:string){
       return this.usersService.find(email);
    }

    //Membuat data baru
    @Post()
    addUser(@Body() body: CreateUserDto){
        this.usersService.create(body.name, body.email, body.password, body.fotoProfil, body.alamat);
    }

    //Menampilkan data sesuai dengan id
    @Get('/:id')
    findUser(@Param('id') id:string){
        return this.usersService.findOneBy(parseInt(id))
    }

    //Mengupdate data
    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
        return this.usersService.update(parseInt(id), body)
    }

    //Menghapus data
    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    //Menampilkan data di dalam session menggunakan Current user
    @Get('/auth/current-user')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User){
        return user;
    }
}
