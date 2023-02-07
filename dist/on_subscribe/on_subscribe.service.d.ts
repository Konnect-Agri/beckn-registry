import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CountryService } from 'src/country/country.service';
export declare class OnSubscribeService {
    private readonly httpService;
    private readonly config;
    private readonly countryService;
    constructor(httpService: HttpService, config: ConfigService, countryService: CountryService);
    onSubscribe({ challenge, subscriber_id, }: {
        challenge: string;
        subscriber_id: string;
    }): Promise<any>;
}
