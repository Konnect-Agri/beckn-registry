"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryProvider = exports.Country = void 0;
const CountryLib = require("country-code-lookup");
exports.Country = 'lib:country-code-lookup';
exports.countryProvider = {
    provide: exports.Country,
    useValue: CountryLib,
};
//# sourceMappingURL=country.provider.js.map