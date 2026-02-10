"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReactionDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const REACTION_TYPES = ['like', 'love', 'haha'];
class CreateReactionDto {
}
exports.CreateReactionDto = CreateReactionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(REACTION_TYPES)
], CreateReactionDto.prototype, "type", void 0);
//# sourceMappingURL=create-reaction.dto.js.map