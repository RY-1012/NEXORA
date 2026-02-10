import { Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FollowsService } from './follows.service';

@Controller('users/:id/follow')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  follow(@Param('id') id: string, @Req() req: { user?: { id: string } }) {
    return this.followsService.follow(id, req.user?.id ?? '');
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  unfollow(@Param('id') id: string, @Req() req: { user?: { id: string } }) {
    return this.followsService.unfollow(id, req.user?.id ?? '');
  }
}
