import { Injectable } from '@nestjs/common';
import { News } from './news.entity';
import { CreateNewDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  //   constructor() {}
  createUpdate(bodyData: CreateNewDto, fileName: string): Promise<News> {
    const newsRepo = new News();
    if (bodyData.id) {
      newsRepo.id = bodyData.id;
    }
    newsRepo.image = fileName;
    newsRepo.title = bodyData.title;
    newsRepo.description = bodyData.description;
    newsRepo.artLink = bodyData.artLink;
    return newsRepo.save();
  }

  getNews(id: string): Promise<News[]> {
    if (id !== 'all') {
      return News.find({ id: id as any });
    } else {
      return News.find();
    }
  }

  removeNews(id: string): Promise<any> {
    return News.delete({ id: id as any });
  }
}
