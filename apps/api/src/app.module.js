"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const core_module_1 = require("./core/core.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./posts/posts.module");
const realtime_module_1 = require("./realtime/realtime.module");
const comments_module_1 = require("./comments/comments.module");
const reactions_module_1 = require("./reactions/reactions.module");
const follows_module_1 = require("./follows/follows.module");
const notifications_module_1 = require("./notifications/notifications.module");
const threads_module_1 = require("./threads/threads.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration]
            }),
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            posts_module_1.PostsModule,
            comments_module_1.CommentsModule,
            reactions_module_1.ReactionsModule,
            follows_module_1.FollowsModule,
            notifications_module_1.NotificationsModule,
            threads_module_1.ThreadsModule,
            realtime_module_1.RealtimeModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map