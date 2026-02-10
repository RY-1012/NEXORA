import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateThreadDto } from './dto/create-thread.dto';
import { ThreadsService } from './threads.service';

@Controller('threads')
@UseGuards(JwtAuthGuard)
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Get()
  list(@Req() req: { user?: { id: string } }) {
    return this.threadsService.listThreads(req.user?.id ?? '');
  }

  @Post()
  create(@Req() req: { user?: { id: string } }, @Body() body: CreateThreadDto) {
    return this.threadsService.createThread(
      req.user?.id ?? '',
      body.participantIds,
      body.title,
      body.isGroup ?? false
    );
  }

  @Get(':id/messages')
  listMessages(@Param('id') id: string) {
    return this.threadsService.listMessages(id);
  }

  @Post(':id/messages')
  sendMessage(
    @Param('id') id: string,
    @Req() req: { user?: { id: string } },
    @Body() body: CreateMessageDto
  ) {
    return this.threadsService.sendMessage(id, req.user?.id ?? '', body.body);
  }
}
