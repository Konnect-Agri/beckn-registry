import { LookupService } from './lookup.service';
import { Request, Response } from 'express';
export declare class LookupController {
    private readonly lookupService;
    constructor(lookupService: LookupService);
    lookup(req: Request, res: Response, body: any): Promise<void>;
}
