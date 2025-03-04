import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service"
import { ExtractJwt,Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport"
import  { ConfigService } from "@nestjs/config"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configServicec: ConfigService, private prisma: PrismaService) {
      
        super({
            //解析用户提交的Bearer Token header数据
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //加密的 密钥
            secretOrKey:configServicec.get('TOKEN_SECRET')

        })
      
    }
    //验证通过后,执行以下代码返回用户资料
    async validate ({sub :id}){
        return this.prisma.user.findUnique({
            where:{
                id,
            }
        })
    }
}