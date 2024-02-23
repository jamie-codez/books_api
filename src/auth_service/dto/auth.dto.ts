import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'The full name of the user',
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty({
    message: 'Full name is required',
  })
  @IsString({
    message: 'Full name must be a string',
  })
  fullName: string;
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@email.com',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part: true,
    require_tld: true,
  })
  email: string;
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'password',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    example: 'johndoe@email.com',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({
    allow_ip_domain: false,
    allow_utf8_local_part: true,
    require_tld: true,
  })
  email: string;
  @ApiProperty({
    description: 'The password of the user',
    type: String,
    example: 'password123',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
