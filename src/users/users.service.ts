import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './user.entity.js';
import { UserDTO } from './dto/user.dto.ts/user.dto.ts.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRespository: Repository<Users>
    ) { }
    
    async findAllUsers(): Promise<Users[]>{
        const users = await this.usersRespository.find();
        return users
    }

    async createUser(userDTO:UserDTO): Promise<UserDTO>{
        const createdUser = await this.usersRespository.save(userDTO);
        return createdUser;
    }

    async findOne(id: string): Promise<Users>{
        return await this.usersRespository.findOne({ where:{id} })
    }

    async updateUser(id: string, user: UserDTO): Promise<UserDTO>{
        await this.usersRespository.update(id, user)
        return this.usersRespository.findOne({where:{id}})
    }

    async deleteUser(id:string):Promise<Users> {
        const user = await this.usersRespository.findOne({ where: { id } })
        await this.usersRespository.delete(id)
        return user
    }
}
