import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { CountryModule } from '../country/country.module';
import { CountryService } from 'src/country/country.service';
@Module({
  imports: [HttpModule, CountryModule],
  providers: [SubscribeService, CountryService],
})
export class SubscribeModule {}
