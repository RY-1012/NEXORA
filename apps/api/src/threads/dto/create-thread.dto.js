"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateThreadDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateThreadDto {
}
exports.CreateThreadDto = CreateThreadDto;
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true })
], CreateThreadDto.prototype, "participantIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], CreateThreadDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)()
], CreateThreadDto.prototype, "isGroup", void 0);
//# sourceMappingURL=create-thread.dto.js.map