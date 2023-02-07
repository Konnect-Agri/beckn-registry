import { SubscribeService } from './subscribe.service';
import { Request, Response } from 'express';
export declare class SubscribeController {
    private readonly subscribeService;
    constructor(subscribeService: SubscribeService);
    getSubscibers(): Promise<import("rxjs").Observable<any>>;
    getSubsciber(params: any): Promise<import("rxjs").Observable<any>>;
    addSubscriber(req: Request, res: Response, body: any): Promise<void>;
}
