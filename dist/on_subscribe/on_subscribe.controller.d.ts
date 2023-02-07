import { OnSubscribeService } from './on_subscribe.service';
import { Request, Response } from 'express';
export declare class OnSubscribeController {
    private readonly onSubscribeService;
    constructor(onSubscribeService: OnSubscribeService);
    onSubscribe(req: Request, res: Response, body: any): Promise<void>;
}
