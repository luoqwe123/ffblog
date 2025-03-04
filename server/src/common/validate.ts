
import { ValidationPipe, ValidationError, HttpException, HttpStatus } from "@nestjs/common";


export class Validate extends ValidationPipe {
    protected flattenValidationErrors(ValidationErrors: ValidationError[],):string[]{
        const errors = ValidationErrors
     
        const message = {}
        
        errors.map(item => {
           
            message[item.property] = Object.values(item.constraints)[0].toString()
            
        })
        
        throw new HttpException(
            {
                code: 422,
                message,
            },
            HttpStatus.UNPROCESSABLE_ENTITY
        )

    }
} 
