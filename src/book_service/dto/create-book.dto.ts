import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'The title of the book',
    type: String,
    example: 'The Great Gatsby',
  })
  @IsString()
  @MinLength(3)
  title: string;
  @ApiProperty({
    description: 'The description of the book',
    type: String,
    example: 'A novel written by F. Scott Fitzgerald',
  })
  @IsString()
  @MinLength(10)
  description: string;
  @ApiProperty({
    description: 'The author of the book',
    type: String,
    example: 'F. Scott Fitzgerald',
  })
  @IsString()
  @MinLength(3)
  author: string;
  @ApiProperty({
    description: 'The ISBN of the book',
    type: String,
    example: '978-3-16-148410-0',
  })
  @IsString()
  @MinLength(13)
  ISBN: string;
}
