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
exports.SubscribeService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const config_1 = require("@nestjs/config");
const country_service_1 = require("../country/country.service");
const utils_1 = require("../utils");
let SubscribeService = class SubscribeService {
    constructor(httpService, config, countryService) {
        this.httpService = httpService;
        this.config = config;
        this.countryService = countryService;
    }
    async addSubscriber(body) {
        var _a;
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
        const countryIsoCode = (_a = this.countryService.country.byCountry((0, utils_1.getCountryName)(country))) === null || _a === void 0 ? void 0 : _a.iso3;
        if (!countryIsoCode) {
            throw new common_1.BadRequestException('Country Not Found');
        }
        if (!['mobility', 'logistics', 'retail'].includes(domain.toLowerCase())) {
            throw new common_1.BadRequestException('Not a valid domain, Possible values: mobility / logistics / retail');
        }
        if (!['bg', 'bap', 'bpp'].includes(type.toLowerCase())) {
            throw new common_1.BadRequestException('Not a valid domain, Possible values: bg / bap / bpp');
        }
        const subscriber = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.config.get('HASURA_URI'), {
            query: createSubscriber,
            variables: {
                subscriber: Object.assign(Object.assign({}, body), { subscriber_id, country: countryIsoCode, nonce: (0, uuid_1.v4)() }),
            },
        }, requestOptions)
            .pipe((0, rxjs_1.map)((item) => item.data)));
        return subscriber;
    }
    async getSubscriber(subscriber_id) {
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
                .pipe((0, rxjs_1.map)((item) => item.data));
            return response;
        }
        catch (err) {
            console.log('Err in get one application form by order id: ', err);
            throw new common_1.InternalServerErrorException();
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
                .pipe((0, rxjs_1.map)((item) => item.data));
            return response;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err);
        }
    }
};
SubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        country_service_1.CountryService])
], SubscribeService);
exports.SubscribeService = SubscribeService;
//# sourceMappingURL=subscribe.service.js.map