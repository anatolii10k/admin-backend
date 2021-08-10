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
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './entities/video.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}
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
    @Body() bodyData: CreateVideoDto,
    @UploadedFile() file,
  ): Promise<Video> {
    return this.videoService.createUpdate(
      bodyData,
      file ? file.filename : bodyData.image,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getNews(@Query() query) {
    return this.videoService.getEvent(query.id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteNews(@Query() query: any) {
    return this.videoService.removeEvent(query.id);
  }
}
