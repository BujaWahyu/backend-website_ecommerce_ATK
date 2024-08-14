import { Controller, Post, Body, Session, Get, UseInterceptors } from '@nestjs/common';
import { Serialize } from '../iterceptors/serialize.interceptor';
import { CreateUserDto } from '../users/dtos/create-users.dto';
import { UserDto } from '../users/dtos/user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from '../users/user.entity';


@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
@Serialize(UserDto)
export class AuthController {
    constructor(private usersService: UsersService, private authService:AuthService){}

       //Register user
       @Post('/register')
       async Register(@Body() body:CreateUserDto, @Session() session: any){
           const user = await this.authService.Register(body.name, body.email, body.password, body.fotoProfil, body.alamat);

           session.userId = user.id;
           return user;
        }
   
       //Login User
       @Post('/login')
       async Login(@Body() body:LoginUserDto, @Session() session: any){
           const user = await this.authService.Login(body.email, body.password);
   
           session.userId =  user.id;
           return user        
       }
   
       //Logout user (agar session di dalam server di hapus)
       @Post('/logout')
       logout(@Session() session:any){
           session.userId = null;
       }
   
       //Melihat user yang login atau register
       @Get('/whoami')
       whoami(@CurrentUser() user: User){
           return user;
       }   
}
