import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { CountryService } from 'src/country/country.service';
import { getCountryName } from 'src/utils';

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
@Injectable()
export class SubscribeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly countryService: CountryService,
  ) {}

  async addSubscriber(body: BodyType) {
    const { subscriber_id, country, domain, type } = body;

    const createSubscriber = `mutation createSubscriber ($subscriber:  beckn_subscribe_insert_input!){
        insert_beckn_subscribe_one (object: $subscriber) {
          subscriber_id,
          unique_key_id,
          status
        }
      }`;

    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': this.config.get('SECRET'),
      },
      query: createSubscriber,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const countryIsoCode = this.countryService.country.byCountry(
      getCountryName(country),
    )?.iso3;

    if (!countryIsoCode) {
      throw new BadRequestException('Country Not Found');
    }

    if (!['mobility', 'logistics', 'retail'].includes(domain.toLowerCase())) {
      throw new BadRequestException(
        'Not a valid domain, Possible values: mobility / logistics / retail',
      );
    }
    if (!['bg', 'bap', 'bpp'].includes(type.toLowerCase())) {
      throw new BadRequestException(
        'Not a valid domain, Possible values: bg / bap / bpp',
      );
    }
    // calling hasura to save the subscriber
    const subscriber = await lastValueFrom(
      this.httpService
        .post(
          this.config.get('HASURA_URI'),
          {
            query: createSubscriber,
            variables: {
              subscriber: {
                ...body,
                subscriber_id,
                country: countryIsoCode,
                nonce: uuidv4(),
              },
            },
          },
          requestOptions,
        )
        .pipe(map((item) => item.data)),
    );

    return subscriber;
  }

  async getSubscriber(subscriber_id: string) {
    try {
      const gql = `query getSubsciber {
        beckn_subscribe(where: {subscriber_id: {_eq: "${subscriber_id}"}}) {
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
          unique_key_id
          valid_from
          valid_until
        }
      }`;

      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': process.env.SECRET,
        },
      };

      const response = await this.httpService
        .post(process.env.HASURA_URI, { query: gql }, requestOptions)
        .pipe(map((item) => item.data));

      return response;
    } catch (err) {
      console.log('Err in get one application form by order id: ', err);
      throw new InternalServerErrorException();
    }
  }

  async getSubscribers() {
    try {
      const query = `query getSubscibers {
        beckn_subscribe {
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
          unique_key_id
          valid_from
          valid_until
        }
      }`;

      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': process.env.SECRET,
        },
      };

      const response = await this.httpService
        .post(process.env.HASURA_URI, { query }, requestOptions)
        .pipe(map((item) => item.data));

      return response;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
