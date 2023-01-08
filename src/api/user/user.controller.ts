import { JwtAuthGuard } from '@common/guard/GlobalGuard/jwt-auth.guard';
import { Controller, Get, UseGuards, Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('유저 인증 API')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Get('/myinfo')
  async getMyInfo(@Headers() headers) {
    return this.userService.getMyinfo(headers);
  }
}
