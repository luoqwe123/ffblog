
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { map } from "rxjs/operators"


@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map((data) => {
                return data?.meta ?{ code: HttpStatus.OK,meta:data.meta,data:data.data}: {
                    code: HttpStatus.OK,
                    data,
                }
            })
        )
    }
}
