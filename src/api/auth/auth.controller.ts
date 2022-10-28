import { Controller, Ip, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/request/signin-request.dto';
import { SignUpRequestDto } from './dto/request/signup-request.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpReq: SignUpRequestDto) {
    return this.authService.signUp(signUpReq);
  }
  @Post('/signin')
  async signIn(@Req() req: Request, @Body() signInReq: SignInRequestDto) {
    return this.authService.signIn(req, signInReq);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/verify')
  async verifyUser(
    @Req() req: Request,
    // @Ip() ip,
    @Body() payload: { access_token: string },
  ) {
    return this.authService.verifyUser(req, payload.access_token);
  }

  @Post('oauth/google')
  async oauthGoogle() {
    return;
  }
  @Post('oauth/naver')
  async oauthNaver() {
    return;
  }

  @Post(`/test`)
  async postTest(
    @Body() userData: { username: string; password: string; email: string },
  ) {
    const { username, password, email } = userData;
    console.log(userData);
    return '404 NOT FOUND 랄까?';
  }

  // @Get('/test')
  // //   async getTest(@Param('id') id: string): Promise<UserModel> {
  // async getTest(@Query('id') id: string): Promise<UserModel> {
  //   console.log('id', id);
  //   return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  // }
}
