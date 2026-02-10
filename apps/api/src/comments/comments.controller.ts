import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './comments.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  list(@Param('postId') postId: string) {
    return this.commentsService.listByPost(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Param('postId') postId: string,
    @Req() req: { user?: { id: string } },
    @Body() body: CreateCommentDto
  ) {
    return this.commentsService.create(postId, req.user?.id ?? '', body.content);
  }
}
