import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  @UseGuards(JwtAuthGuard)
  createNew(
    @Body() bodyData: CreateEventDto,
    @UploadedFile() file,
  ): Promise<Event> {
    return this.eventsService.createUpdate(
      bodyData,
      file ? file.filename : bodyData.image,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getNews(@Query() query) {
    return this.eventsService.getEvent(query.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteNews(@Query() query: any) {
    return this.eventsService.removeEvent(query.id);
  }
}
