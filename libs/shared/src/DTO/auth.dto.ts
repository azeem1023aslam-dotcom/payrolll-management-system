import { ApiProperty } from "@nestjs/swagger";

export class signupDto{
    @ApiProperty({example:'Azeem Aslam'})
    name:string;
    
    @ApiProperty({example:'azeem@gmail.com'})
    email:string;

    @ApiProperty({example:'123'})
    password:string;

    @ApiProperty({example:'employee'})
    role:string
}

export class loginDto {
    @ApiProperty({example:'azeem@gmail.com'})
    email:string

    @ApiProperty({example:'123'})
    password:string
}

export class forgetPasswordDto {
    @ApiProperty({example:'azeem@gmail.com'})
    email:string
}