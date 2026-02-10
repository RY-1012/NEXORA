import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { ReactionsService } from './reactions.service';

@Controller('posts/:postId/reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('postId') postId: string,
    @Req() req: { user?: { id: string } },
    @Body() body: CreateReactionDto
  ) {
    return this.reactionsService.addPostReaction(postId, req.user?.id ?? '', body.type);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Param('postId') postId: string, @Req() req: { user?: { id: string } }) {
    return this.reactionsService.removePostReaction(postId, req.user?.id ?? '');
  }
}
