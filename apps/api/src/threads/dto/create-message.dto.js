"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1)
], CreateMessageDto.prototype, "body", void 0);
//# sourceMappingURL=create-message.dto.js.map