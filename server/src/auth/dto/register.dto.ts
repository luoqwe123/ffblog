import { IsNotEmpty } from "class-validator"
import { IsConfirm } from "src/common/rules/is-confirm.rules";
import { IsNotExistsRule } from "src/common/rules/is-not-exists.rule";


export default class RegisterDto {
    //表单验证
    @IsNotEmpty({ message: "用户名不能为空" })
    @IsNotExistsRule('user', { message: "用户已注册" })
    name: string;
    @IsNotEmpty({ message: "密码不能为空" })
    @IsConfirm( { message: "两次密码不一致" })
    password: string;
    @IsNotEmpty({ message: "确认密码不能为空" })
    password_confirm: string

}