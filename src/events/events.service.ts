import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  createUpdate(bodyData: CreateEventDto, fileName: string): Promise<Event> {
    const eventRepo = new Event();
    if (bodyData.id) {
      eventRepo.id = bodyData.id;
    }
    eventRepo.image = fileName;
    eventRepo.title = bodyData.title;
    eventRepo.title = bodyData.title;
    eventRepo.description = bodyData.description;
    eventRepo.eventLink = bodyData.eventLink;
    eventRepo.time = bodyData.time;
    return eventRepo.save();
  }

  getEvent(id: string): Promise<Event[]> {
    if (id !== 'all') {
      return Event.find({ id: id as any });
    } else {
      return Event.find();
    }
  }

  removeEvent(id: string): Promise<any> {
    return Event.delete({ id: id as any });
  }
}
