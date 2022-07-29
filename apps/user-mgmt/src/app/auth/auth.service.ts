import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,  
    ){}

    async validateUser(username: string, password:string): Promise<any>{
        const user = await this.usersService.findOne(username);

        if (user && await bcrypt.compare(password,user.password)){
            //const { password, ...result } = user;
            user.password = null;
            return user;
        }
        return null;
    }

    async login(user: any){
        const payload = {username: user.username, role: user.role};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }
}
