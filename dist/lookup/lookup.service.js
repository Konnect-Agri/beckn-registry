"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LookupService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const country_service_1 = require("../country/country.service");
let LookupService = class LookupService {
    constructor(httpService, config, countryService) {
        this.httpService = httpService;
        this.config = config;
        this.countryService = countryService;
    }
    async lookup(body) {
        const { subscriber_id, country, city, domain, type } = body;
        try {
            const countryIsoCode = this.countryService.country.byIso(country);
        }
        catch (err) {
            console.log({ err });
            throw new common_1.BadRequestException('Country Not Found');
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
        const subscriber = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.config.get('HASURA_URI'), {
            query: findSubscriber,
        }, requestOptions)
            .pipe((0, rxjs_1.map)((item) => item.data)));
        return subscriber;
    }
};
LookupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        country_service_1.CountryService])
], LookupService);
exports.LookupService = LookupService;
//# sourceMappingURL=lookup.service.js.map