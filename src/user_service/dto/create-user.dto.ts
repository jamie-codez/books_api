import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the User',
    type: String,
    example: 'user123',
  })
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;
  @ApiProperty({
    description: 'The first name of the User',
    type: String,
    example: 'John',
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  firstName: string;
  @ApiProperty({
    description: 'The last name of the User',
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  lastName: string;
  @ApiProperty({
    description: 'The email of the User',
    type: String,
    example: 'johndoe@email.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @ApiProperty({
    description: 'The phone number of the User',
    type: String,
    example: '+1234567890',
  })
  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @MinLength(10, {
    message: 'Phone number must be at least 10 characters long',
  })
  phoneNumber: string;
  @ApiProperty({
    description: 'The password of the User',
    type: String,
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of the User',
    type: String,
    example: 'johndoe@email.com',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @ApiProperty({
    description: 'The password of the User',
    type: String,
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}
