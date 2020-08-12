import {
    IsDefined,
    IsEmail,
    IsNotEmpty, IsNumber,
    IsNumberString,
    IsString,
} from 'class-validator';
import 'reflect-metadata';

export class UserObjects {
    userId?: number;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userName?: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userPassword?: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    userFirstName?: string;

    @IsString()
    userLastName?: string;

    @IsEmail()
    userEmail?: string;

    @IsNumberString()
    userStatus?: string;
}

export class UserIdObject{
    @IsNumber()
    @IsNotEmpty()
    @IsDefined()
    userId?: number;
}
