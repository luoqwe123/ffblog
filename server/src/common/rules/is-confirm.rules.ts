

import {
    registerDecorator,
    ValidationArguments, 
    ValidationOptions,

} from "class-validator"
import { at } from "lodash"

export function IsConfirm(validationOptions?:ValidationOptions) {
    return function (object: Record<string, any>, propretyName: string) {
        registerDecorator({
            name: 'IsConfirm',
            target: object.constructor,
            propertyName: propretyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value:String,args:ValidationArguments){
                   return Boolean (value == args.object[`${args.property}_confirm`])
                }
            }
        })
    }
}