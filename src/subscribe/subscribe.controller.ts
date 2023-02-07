import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { Request, Response } from 'express';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Get()
  async getSubscibers() {
    return this.subscribeService.getSubscribers();
  }

  @Get(':id')
  async getSubsciber(@Param() params) {
    return this.subscribeService.getSubscriber(params.id);
  }

  @Post()
  async addSubscriber(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
  ) {
    const response = await this.subscribeService.addSubscriber(body);
    res.json(response);
  }
}
