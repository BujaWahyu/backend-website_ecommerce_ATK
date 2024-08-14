import { Injectable } from "@nestjs/common";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common/exceptions";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { UsersService } from "../users/users.service";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private authService: UsersService){}
  
    async Register(name:string, email:string, password:string, fotoProfil:string, alamat:string ){
        const users = await this.authService.find(email)

        if(users.length){
            throw new BadRequestException('email yang anda masukan sudah terdaftar')
        }

        //hash password
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password,salt,64)) as Buffer;

        const hashpassword = salt + '.' + hash.toString('hex')

        //create new user
        const user = await this.authService.create(name, email, hashpassword, fotoProfil, alamat)

        return user

    }

    //Membuat service untuk login
    async Login(email:string, password:string){
        try{
            const [users] = await this.authService.find(email)

            if(!users){
                throw new NotFoundException('User Not Found')
            }
    
            const [salt, storedHash] = users.password.split('.');
            const hash = (await scrypt(password,salt,64)) as Buffer;
    
            if(storedHash !== hash.toString('hex')){
                throw new BadRequestException('Password yang dimasukan salah')
            }

            return users
            
        }catch(err){
            console.error('Error during login:', err);
            throw new InternalServerErrorException('ada yang salah');
        }

    }
}
