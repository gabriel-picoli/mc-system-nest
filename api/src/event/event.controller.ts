import { Body, Controller, Post } from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { CreateEventDto } from './dtos/createEvent.dto';
import { Event } from './interfaces/event.interface';

@Controller('event')
export class EventController {
  private events: Event[] = [];

  @Post()
  create(@Body() createEventDto: CreateEventDto): {
    message: string;
    event: Event;
  } {
    const newEvent: Event = {
      id: uuidv4(),
      title: createEventDto.title,
      start: createEventDto.start,
      end: createEventDto.end,
      backgroundColor: '#64BAB8',
      resourceId: createEventDto.resourceId,
    };

    this.events.push(newEvent);
    console.log(this.events);

    return {
      message: `Evento criado com sucesso: ${newEvent.title}`,
      event: newEvent,
    };
  }
}
