import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async register(@Body() createUserDto: CreateUserDto){
    if (await this.userService.findOne(createUserDto.username)){
      throw new BadRequestException("User alredy exists");
    }else{
      return await this.userService.register(createUserDto);
    }
  }

  @Get()
  async findAll(): Promise<User[]>{
    let users = await this.userService.findAll();
    for (let user of users){
      user.password = null;
    }
    return users;
  }

  @Get(':username')
  async findByUsernamePublic(@Param('username') id: string): Promise<User>{
    let user = await this.userService.findOne(id);
    user.password = null;
    return user;
  }

  async findByUsername(@Param('username') id: string): Promise<User>{
    return this.userService.findOne(id);
  }

  @Delete(':username')
  async delete(@Param('username') id: string){
    let user = await this.userService.delete(id);
    user.password = null;
    return user;
  }
}
