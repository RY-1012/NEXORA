"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateCommentDto {
}
exports.CreateCommentDto = CreateCommentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1)
], CreateCommentDto.prototype, "content", void 0);
//# sourceMappingURL=create-comment.dto.js.map