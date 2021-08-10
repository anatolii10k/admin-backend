import { IsString } from 'class-validator';

export class CreateNewDto {
  @IsString()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  artLink: string;

  @IsString()
  image?: string;
}
