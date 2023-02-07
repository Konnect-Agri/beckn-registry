import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { CountryService } from 'src/country/country.service';
import { getCountryName } from 'src/utils';

type BodyType = {
  subscriber_id: string;
  country: string;
  city: string;
  domain: 'mobility' | 'logistics' | 'retail';
  type: 'bap' | 'bpp' | 'bg';
};

@Injectable()
export class LookupService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly countryService: CountryService,
  ) {}

  async lookup(body: BodyType) {
    const { subscriber_id, country, city, domain, type } = body;

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const countryIsoCode = this.countryService.country.byIso(country);
    } catch (err) {
      console.log({ err });
      throw new BadRequestException('Country Not Found');
    }

    const findSubscriber = `query getSubsciber {
        beckn_subscribe(where: {subscriber_id: {_eq: "${subscriber_id}"}, type: {_eq: "${type}"}, domain: {_eq: "${domain}"}, country: {_eq: "${country}"}, city: {_eq: "${city}"}}) {
          country
          city
          created
          domain
          encr_public_key
          signing_public_key
          status
          subscriber_id
          subscriber_url
          type
          valid_from
          valid_until
        }
      }`;

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': this.config.get('SECRET'),
      },
      query: findSubscriber,
    };

    // calling hasura to lookup the subscriber
    const subscriber = await lastValueFrom(
      this.httpService
        .post(
          this.config.get('HASURA_URI'),
          {
            query: findSubscriber,
          },
          requestOptions,
        )
        .pipe(map((item) => item.data)),
    );

    return subscriber;
  }
}
