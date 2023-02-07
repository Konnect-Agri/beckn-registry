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
exports.OnSubscribeService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const country_service_1 = require("../country/country.service");
const crypto_1 = require("crypto");
const util_1 = require("util");
const uuid_1 = require("uuid");
let OnSubscribeService = class OnSubscribeService {
    constructor(httpService, config, countryService) {
        this.httpService = httpService;
        this.config = config;
        this.countryService = countryService;
    }
    async onSubscribe({ challenge, subscriber_id, }) {
        var _a, _b;
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
        const subscribers = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(this.config.get('HASURA_URI'), {
            query: findSubscriber,
        }, requestOptions)
            .pipe((0, rxjs_1.map)((item) => item.data)));
        const subscriber = (_b = (_a = subscribers === null || subscribers === void 0 ? void 0 : subscribers.data) === null || _a === void 0 ? void 0 : _a.beckn_subscribe) === null || _b === void 0 ? void 0 : _b[0];
        if (!subscriber) {
            throw new common_1.NotFoundException('No Subscriber Found');
        }
        console.log({ subscriber, subscribers });
        const iv = (0, crypto_1.randomBytes)(16);
        const randomString = (0, uuid_1.v4)();
        const key = (await (0, util_1.promisify)(crypto_1.scrypt)(subscriber === null || subscriber === void 0 ? void 0 : subscriber.encr_public_key, 'salt', 32));
        const cipher = (0, crypto_1.createCipheriv)('aes-256-ctr', key, iv);
        const encryptedText = Buffer.concat([
            cipher.update(randomString),
            cipher.final(),
        ]);
        const answer = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(`${subscriber === null || subscriber === void 0 ? void 0 : subscriber.callback_url}/on_subscribe`, {
            challenge: encryptedText,
            subscriber_id: subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscriber_id,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Signature: '',
            },
        })
            .pipe((0, rxjs_1.map)((item) => item.data)));
        return answer;
    }
};
OnSubscribeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        country_service_1.CountryService])
], OnSubscribeService);
exports.OnSubscribeService = OnSubscribeService;
//# sourceMappingURL=on_subscribe.service.js.map