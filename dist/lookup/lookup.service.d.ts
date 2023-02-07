import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CountryService } from 'src/country/country.service';
type BodyType = {
    subscriber_id: string;
    country: string;
    city: string;
    domain: 'mobility' | 'logistics' | 'retail';
    type: 'bap' | 'bpp' | 'bg';
};
export declare class LookupService {
    private readonly httpService;
    private readonly config;
    private readonly countryService;
    constructor(httpService: HttpService, config: ConfigService, countryService: CountryService);
    lookup(body: BodyType): Promise<any>;
}
export {};
