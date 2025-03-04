import { Body, Controller, Post,HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';

@Controller()
export class AuthController {

    constructor(private readonly auth:AuthService){}
    @Post("register") @HttpCode(200)
    register(@Body() body:RegisterDto){
       
        return this.auth.register(body)
    }
    @Post("login") @HttpCode(200)
    login(@Body() data:LoginDto){
        return this.auth.login(data)
    }
}
