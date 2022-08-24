import { Controller } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { GrpcMethod } from '@nestjs/microservices';
import { USER_MGMT_SERVICE_NAME } from '../user-mgmt.pb';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @GrpcMethod(USER_MGMT_SERVICE_NAME, 'register')
  async register(createUserDto: CreateUserDto): Promise<any> {
    console.log(createUserDto);

    if (await this.userService.findOne(createUserDto.email)) {
      return { error: 'user_already_exists' };
    } else {
      return { user: await this.userService.register(createUserDto) };
    }
  }

  @GrpcMethod(USER_MGMT_SERVICE_NAME, 'findAll')
  async findAll(): Promise<any> {
    const users = await this.userService.findAll();
    const userList: any = { users: [...users] };
    return userList;
  }

  @GrpcMethod(USER_MGMT_SERVICE_NAME, 'findByUsername')
  async findByUsername(userRequest: any): Promise<any> {
    const user = await this.userService.findOne(userRequest.email);
    if (user) {
      return { user: user };
    } else {
      return { error: 'no_such_user' };
    }
  }

  @GrpcMethod(USER_MGMT_SERVICE_NAME, 'delete')
  async delete(userRequest: any) {
    const user = await this.userService.delete(userRequest.email);
    if (user) {
      return { user: user };
    } else {
      return { error: 'delete_error' };
    }
  }

  @GrpcMethod(USER_MGMT_SERVICE_NAME, 'update')
  async update(userRequest: any) {
    const user = await this.userService.update(userRequest._id, userRequest);
    if (user) {
      return { user: user };
    } else {
      return { error: 'update_error' };
    }
  }
}
