
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { user } from "@prisma/client"
import { Role } from "src/auth/enum"

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //获取用户的信息 ，其信息的来源为jwt守卫 ，其数据储存在 Request 对象中 
    const user = context.switchToHttp().getRequest().user as user //switchToHttp 用于切换到http服务
    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()])
   
    return roles.length ? roles.some((role) => user.role == role) : true

  }
}
