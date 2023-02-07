import { Injectable, Inject } from '@nestjs/common';
import { Country } from './country.provider';

@Injectable()
export class CountryService {
  constructor(@Inject(Country) private country) {
    // console.log('This is the lookup instance:');
    // console.log(this.lookup);
  }
}
