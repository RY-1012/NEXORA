import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  list() {
    return this.postsService.list();
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.postsService.byId(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req: { user?: { id: string } }, @Body() body: CreatePostDto) {
    return this.postsService.create(req.user?.id ?? '', body.content);
  }
}
