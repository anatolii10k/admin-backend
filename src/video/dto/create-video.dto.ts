import { IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  videoLink: string;

  @IsString()
  time: Date;

  @IsString()
  image?: string;
}
