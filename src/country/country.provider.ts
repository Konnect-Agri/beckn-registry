import { Provider } from '@nestjs/common';
import * as CountryLib from 'country-code-lookup';

export const Country = 'lib:country-code-lookup';

export const countryProvider: Provider = {
  provide: Country,
  useValue: CountryLib,
};
