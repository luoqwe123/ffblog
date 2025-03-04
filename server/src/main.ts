import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Validate } from "./common/validate";
import { ResponseInterceptor } from './response.inteceptor';
import { NestExpressApplication } from "@nestjs/platform-express"
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //管道，用于对前端发送来的数据进行检验

  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.setGlobalPrefix('api')
  app.useStaticAssets('uploads', { prefix: "/uploads" })
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))) //数据拦截器，在数据响应前对数据进行处理
  //  app.use(
  //   '/api', // 需要代理的路径
  //   createProxyMiddleware({
  //     target: 'http://localhost:5174', // 目标服务器地址
  //     changeOrigin: true,
  //   }),
  // );
  app.enableCors()


  await app.listen(3000);
}
bootstrap();
