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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeController = void 0;
const common_1 = require("@nestjs/common");
const subscribe_service_1 = require("./subscribe.service");
let SubscribeController = class SubscribeController {
    constructor(subscribeService) {
        this.subscribeService = subscribeService;
    }
    async getSubscibers() {
        return this.subscribeService.getSubscribers();
    }
    async getSubsciber(params) {
        return this.subscribeService.getSubscriber(params.id);
    }
    async addSubscriber(req, res, body) {
        const response = await this.subscribeService.addSubscriber(body);
        res.json(response);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "getSubscibers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "getSubsciber", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SubscribeController.prototype, "addSubscriber", null);
SubscribeController = __decorate([
    (0, common_1.Controller)('subscribe'),
    __metadata("design:paramtypes", [subscribe_service_1.SubscribeService])
], SubscribeController);
exports.SubscribeController = SubscribeController;
//# sourceMappingURL=subscribe.controller.js.map