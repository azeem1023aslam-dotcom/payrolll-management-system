import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
export class signupDto{
    @IsString()
    @ApiProperty({example:'Azeem Aslam'})
    name:string;
    
    @IsEmail()
    @ApiProperty({example:'azeem@gmail.com'})
    email:string;

    @MinLength(6)
    @ApiProperty({example:'123'})
    password:string;

    @IsEnum(['employee','admin'])
    @ApiProperty({example:'employee', enum:['employee','admin'],default:'employee'})
    role:string
}

export class loginDto {
    @IsEmail()
    @ApiProperty({example:'azeem@gmail.com'})
    email:string

    @MinLength(6)
    @ApiProperty({example:'123'})
    password:string
}

export class forgetPasswordDto {
    @IsEmail()
    @ApiProperty({example:'azeem@gmail.com'})
    email:string
}

export class resetPasswordDto {
    @IsString()
    @ApiProperty({example:'...................'})
    token:string

    @MinLength(6)
    @ApiProperty({example:'123'})
    password:string

    @MinLength(6)
    @ApiProperty({example:'123'})
    confirmPassword:string
}