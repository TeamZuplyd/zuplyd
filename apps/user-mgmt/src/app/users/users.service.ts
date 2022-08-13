import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const registeredUser = await this.userModel.create(createUserDto);
    return registeredUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async delete(email: string) {
    const deletedUser = await this.userModel.findOneAndRemove({ email: email }).exec();
    return deletedUser;
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, {
      returnOriginal: false,
    });
  }
}
