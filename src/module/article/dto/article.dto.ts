import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  categoryId: number;

  images: string[];
}

export class EditArticleDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  categoryId: number;

  images: string[];
}
