import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { CountryService } from 'src/country/country.service';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class OnSubscribeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly countryService: CountryService,
  ) {}

  async onSubscribe({
    challenge,
    subscriber_id,
  }: {
    challenge: string;
    subscriber_id: string;
  }) {
    const findSubscriber = `query getSubsciber {
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
          valid_from
          valid_until,
          callback_url
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
    const subscribers = await lastValueFrom(
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
    const subscriber = subscribers?.data?.beckn_subscribe?.[0];
    if (!subscriber) {
      throw new NotFoundException('No Subscriber Found');
    }
    console.log({ subscriber, subscribers });
    const iv = randomBytes(16);
    const randomString = uuidv4();

    // The key length is dependent on the algorithm.
    // In this case for aes256, it is 32 bytes.

    const key = (await promisify(scrypt)(
      subscriber?.encr_public_key,
      'salt',
      32,
    )) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(randomString),
      cipher.final(),
    ]);
    const answer = await lastValueFrom(
      this.httpService
        .post(
          `${subscriber?.callback_url}/on_subscribe`,
          {
            challenge: encryptedText,
            subscriber_id: subscriber?.subscriber_id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Signature: '',
            },
          },
        )
        .pipe(map((item) => item.data)),
    );
    return answer;
  }
}
