import { UsersService } from './users.service';
import { Controller, Get, Param, Res, Post, Body, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UserDTO } from './dto/user.dto.ts/user.dto.ts';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }
    
    @Get()
    async findAllUsers(@Res() response: Response) {
        const users = await this.usersService.findAllUsers();
        return response.status(200).json(users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        const user = await this.usersService.findOne(id);
        if (!user) {
            throw new Error('User not found')
        } else {
            return user
        }
    }

    @Post()
    async createUser(@Res() response: Response, @Body() userDTO: UserDTO) {
        const userCreated = await this.usersService.createUser(userDTO)
        return response.status(201).json(userCreated);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userDTO: UserDTO) {
        return this.usersService.updateUser(id, userDTO)
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        const user = await this.usersService.findOne(id)
        if (!user) {
            throw new Error('User not found')
        }
        return this.usersService.deleteUser(id)
    }
}
