import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { LookupService } from './lookup.service';
import { Request, Response } from 'express';

@Controller('lookup')
export class LookupController {
  constructor(private readonly lookupService: LookupService) {}

  @Post()
  async lookup(@Req() req: Request, @Res() res: Response, @Body() body: any) {
    const response = await this.lookupService.lookup(body);
    res.json(response);
  }
}
