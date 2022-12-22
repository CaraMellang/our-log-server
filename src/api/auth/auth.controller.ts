import { Controller, Ip, Post, Body, Req, Res, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/request/signin-request.dto';
import { SignUpRequestDto } from './dto/request/signup-request.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '@common/guard/GlobalGuard/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('유저 인증 API')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignUpRequestDto })
  @ApiOperation({
    summary: '회원가입 API',
    description: '이메일과 비밀번호를 받아서 회원가입을 진행합니다. 회원가입 완료시 true가 반환됩니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: 'true' })
  @ApiUnauthorizedResponse({ description: '회원가입 실패' })
  @Post('/signup')
  async signUp(@Body() signUpReq: SignUpRequestDto) {
    return this.authService.signUp(signUpReq);
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(@Req() req: Request, @Body() signInReq: SignInRequestDto) {
    return this.authService.signIn(req, signInReq);
  }

  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/verify')
  async verifyUser(
    @Req() req: Request,
    // @Ip() ip,
    @Body() payload: { access_token: string },
  ) {
    return this.authService.verifyUser(req, payload.access_token);
  }

  @ApiBearerAuth('Authorization')
  @Post('oauth/google')
  async oauthGoogle() {
    return;
  }

  @ApiBearerAuth('Authorization')
  @Post('oauth/naver')
  async oauthNaver() {
    return;
  }

  @Post(`/test`)
  async postTest(@Body() userData: { username: string; password: string; email: string }) {
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
