import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class createUserDto {
    @IsString()
    @MaxLength(30)
    fullName: string
    
    @IsEmail()
    @MaxLength(30)
    email: string

    @IsString()
    @MinLength(8)
    password: string


}