import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CountryService } from 'src/country/country.service';
type BodyType = {
    subscriber_id: string;
    country: string;
    city: string;
    domain: 'mobility' | 'logistics' | 'retail';
    signing_public_key: string;
    encr_public_key: string;
    valid_from: string;
    valid_until: string;
    nonce: string;
    unique_key_id: string;
    pub_key_id: string;
    type: string;
    subscriber_url: string;
    status?: string;
    updated?: string;
};
export declare class SubscribeService {
    private readonly httpService;
    private readonly config;
    private readonly countryService;
    constructor(httpService: HttpService, config: ConfigService, countryService: CountryService);
    addSubscriber(body: BodyType): Promise<any>;
    getSubscriber(subscriber_id: string): Promise<import("rxjs").Observable<any>>;
    getSubscribers(): Promise<import("rxjs").Observable<any>>;
}
export {};
