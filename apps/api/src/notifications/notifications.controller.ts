import { Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  list(@Req() req: { user?: { id: string } }) {
    return this.notificationsService.list(req.user?.id ?? '');
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthGuard)
  markRead(@Param('id') id: string, @Req() req: { user?: { id: string } }) {
    return this.notificationsService.markRead(req.user?.id ?? '', id);
  }
}
