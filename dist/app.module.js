"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const registry_service_1 = require("./registry/registry.service");
const registry_controller_1 = require("./registry/registry.controller");
const registry_module_1 = require("./registry/registry.module");
const subscribe_controller_1 = require("./subscribe/subscribe.controller");
const subscribe_module_1 = require("./subscribe/subscribe.module");
const subscribe_service_1 = require("./subscribe/subscribe.service");
const axios_1 = require("@nestjs/axios");
const env_helper_1 = require("./common/helper/env.helper");
const config_1 = require("@nestjs/config");
const country_module_1 = require("./country/country.module");
const country_service_1 = require("./country/country.service");
const lookup_controller_1 = require("./lookup/lookup.controller");
const lookup_service_1 = require("./lookup/lookup.service");
const on_subscribe_controller_1 = require("./on_subscribe/on_subscribe.controller");
const on_subscribe_service_1 = require("./on_subscribe/on_subscribe.service");
const callback_service_1 = require("./callback/callback.service");
const callback_controller_1 = require("./callback/callback.controller");
const envFilePath = (0, env_helper_1.getEnvPath)(`${__dirname}/common/envs`);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            registry_module_1.RegistryModule,
            subscribe_module_1.SubscribeModule,
            axios_1.HttpModule,
            country_module_1.CountryModule,
            config_1.ConfigModule.forRoot({ envFilePath, isGlobal: true }),
        ],
        controllers: [
            app_controller_1.AppController,
            registry_controller_1.RegistryController,
            subscribe_controller_1.SubscribeController,
            lookup_controller_1.LookupController,
            on_subscribe_controller_1.OnSubscribeController,
            callback_controller_1.CallbackController,
        ],
        providers: [
            app_service_1.AppService,
            registry_service_1.RegistryService,
            subscribe_service_1.SubscribeService,
            lookup_service_1.LookupService,
            country_service_1.CountryService,
            on_subscribe_service_1.OnSubscribeService,
            callback_service_1.CallbackService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map