import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req: { user?: { id: string } }) {
    return this.usersService.getMe(req.user?.id ?? '');
  }

  @Get(':id')
  byId(@Param('id') id: string) {
    return this.usersService.getById(id);
  }
}
