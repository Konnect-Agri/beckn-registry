import { Module } from '@nestjs/common';
import { countryProvider } from './country.provider';
import { CountryService } from './country.service';

@Module({
  providers: [countryProvider, CountryService],
  exports: [countryProvider],
})
export class CountryModule {}
