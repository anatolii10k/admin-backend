import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
