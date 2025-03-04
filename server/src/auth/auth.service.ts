import { BadRequestException, Injectable } from '@nestjs/common';
import RegisterDto from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash,verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dto/login.dto';


@Injectable()
export class AuthService {

    constructor(private prisma:PrismaService,private jwt:JwtService){

    }

    async register(dto:RegisterDto){
        const user = await this.prisma.user.create({
            data:{
                name:dto.name,
                password: await hash(dto.password)
            }
        })
        return this.token(user)
    }
    private async token({ id,name }){
        return { 
            
            token: await this.jwt.signAsync({
                name,
                sub:id
            }),
            message:"success"
        }
    }
    async login(data :LoginDto){
        const user = await this.prisma.user.findUnique({
            where:{
                name:data.name
            }
        })
        if(!(await verify(user.password,data.password))){
            throw new BadRequestException('密码输入错误')
        }
       
        return this.token(user)
    }

}
