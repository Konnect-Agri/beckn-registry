import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistryService } from './registry/registry.service';
import { RegistryController } from './registry/registry.controller';
import { RegistryModule } from './registry/registry.module';
import { SubscribeController } from './subscribe/subscribe.controller';
import { SubscribeModule } from './subscribe/subscribe.module';
import { SubscribeService } from './subscribe/subscribe.service';
import { HttpModule } from '@nestjs/axios';

import { getEnvPath } from './common/helper/env.helper';
import { ConfigModule } from '@nestjs/config';
import { CountryModule } from './country/country.module';
import { CountryService } from './country/country.service';
import { LookupController } from './lookup/lookup.controller';
import { LookupService } from './lookup/lookup.service';
import { OnSubscribeController } from './on_subscribe/on_subscribe.controller';
import { OnSubscribeService } from './on_subscribe/on_subscribe.service';
import { CallbackService } from './callback/callback.service';
import { CallbackController } from './callback/callback.controller';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    RegistryModule,
    SubscribeModule,
    HttpModule,
    CountryModule,
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
  ],
  controllers: [
    AppController,
    RegistryController,
    SubscribeController,
    LookupController,
    OnSubscribeController,
    CallbackController,
  ],
  providers: [
    AppService,
    RegistryService,
    SubscribeService,
    LookupService,
    CountryService,
    OnSubscribeService,
    CallbackService,
  ],
})
export class AppModule {}
