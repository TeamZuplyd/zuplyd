import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  RegisterResponse,
  UserList,
  UserRequest,
} from '../user_mgmt.pb';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'register')
  async register(createUserDto: CreateUserDto): Promise<any> {
    console.log('reached');
    if (await this.userService.findOne(createUserDto.username)) {
      throw new BadRequestException('User alredy exists');
    } else {
      return await this.userService.register(createUserDto);
    }
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'findAll')
  async findAll(): Promise<any> {
    const users = await this.userService.findAll();
    // for (const user of users) {
    //   user.password = null;
    // }
    console.log('users: ' + users);
    const userList: any = { users: [...users] };
    return users;
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'findByUsername')
  async findByUsername(userRequest: any): Promise<User> {
    const user = await this.userService.findOne(userRequest.username);
    //user.password = 'password';
    return user;
  }

  // async findByUsername(@Param('username') id: string): Promise<User> {
  //   return this.userService.findOne(id);
  // }

  @Delete(':username')
  async delete(@Param('username') id: string) {
    const user = await this.userService.delete(id);
    user.password = null;
    return user;
  }
}
