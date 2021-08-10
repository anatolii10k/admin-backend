import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {
  createUpdate(bodyData: CreateVideoDto, fileName: string): Promise<Video> {
    const videoRepo = new Video();
    if (bodyData.id) {
      videoRepo.id = bodyData.id;
    }
    videoRepo.image = fileName;
    videoRepo.title = bodyData.title;
    videoRepo.title = bodyData.title;
    videoRepo.description = bodyData.description;
    videoRepo.videoLink = bodyData.videoLink;
    videoRepo.time = bodyData.time;
    return videoRepo.save();
  }

  getEvent(id: string): Promise<Video[]> {
    if (id !== 'all') {
      return Video.find({ id: id as any });
    } else {
      return Video.find();
    }
  }

  removeEvent(id: string): Promise<any> {
    return Video.delete({ id: id as any });
  }
}
