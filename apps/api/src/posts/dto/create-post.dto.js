"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreatePostDto {
}
exports.CreatePostDto = CreatePostDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1)
], CreatePostDto.prototype, "content", void 0);
//# sourceMappingURL=create-post.dto.js.map