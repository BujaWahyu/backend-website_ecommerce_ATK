import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { NextFunction, Request, Response } from "express";
import { User } from "../../users/user.entity";

//currentUsernya harus di deklarasikan secara global
declare global{
    namespace Express{
        interface Request{
            currentUser:User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private userService: UsersService){}

    async use(req: Request, res: Response, next: NextFunction){
        const {userId} = req.session || {};

        if(userId){
            const user = await this.userService.findOneBy(userId);
            req.currentUser = user;
        }

        next();
    }

}