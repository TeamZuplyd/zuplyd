import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ){}

  async register(createUserDto: CreateUserDto): Promise<User>{
    //password hashing done by bcrypt
    const saltRounds = 10;
    
    createUserDto.password = await bcrypt.hash(createUserDto.password,saltRounds);

    const registeredUser = await this.userModel.create(createUserDto);
    return registeredUser;
  }

  async findAll(): Promise<User[]>{
    return this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User>{
    return this.userModel.findOne({username: username}).exec();
  }

  async delete(username: string){
    const deletedUser = await this.userModel
      .findOneAndRemove({username: username})
      .exec();
    return deletedUser;
  }
}
