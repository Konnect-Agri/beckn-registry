"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryName = void 0;
const getCountryName = (country) => {
    const str = country;
    const arr = str.split(' ');
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
    }
    return arr.join(' ');
};
exports.getCountryName = getCountryName;
//# sourceMappingURL=utils.js.map