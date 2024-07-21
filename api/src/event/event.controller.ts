import { Controller, Post } from '@nestjs/common';

@Controller('event')
export class EventController {
  @Post()
  async createEvent() {
    return JSON.stringify({ test: 'hello world' });
  }
}
