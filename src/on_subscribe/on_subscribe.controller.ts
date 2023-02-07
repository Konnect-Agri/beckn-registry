import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { OnSubscribeService } from './on_subscribe.service';
import { Request, Response } from 'express';

@Controller('on-subscribe')
export class OnSubscribeController {
  constructor(private readonly onSubscribeService: OnSubscribeService) {}

  @Post()
  async onSubscribe(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: any,
  ) {
    const response = await this.onSubscribeService.onSubscribe(body);
    res.json(response);
  }
}
