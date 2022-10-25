import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/request/signup-request.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpReq: SignInRequestDto) {
    return this.authService.signUp(signUpReq);
  }
  @Post('/signin')
  async signIn() {
    return;
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
