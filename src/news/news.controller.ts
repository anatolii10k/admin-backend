import {
  Controller,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Query,
  Get,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { News } from './news.entity';
import { CreateNewDto } from './dto/create-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
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
    @Body() bodyData: CreateNewDto,
    @UploadedFile() file,
  ): Promise<News> {
    return this.newsService.createUpdate(
      bodyData,
      file ? file.filename : bodyData.image,
    );
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateNews(
    @Body() bodyData: CreateNewDto,
    @UploadedFile() file,
  ): Promise<News> {
    return this.newsService.createUpdate(
      bodyData,
      file.filename ? file.filename : bodyData.image,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getNews(@Query() query) {
    return this.newsService.getNews(query.id);
  }

  @Get('/image')
  getImage(@Query() query: any, @Res() res) {
    return res.sendFile(query.name, { root: './files' });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteNews(@Query() query: any) {
    return this.newsService.removeNews(query.id);
  }
}
