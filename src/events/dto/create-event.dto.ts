import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  id?: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  eventLink: string;

  @IsString()
  time: Date;

  @IsString()
  image?: string;
}
