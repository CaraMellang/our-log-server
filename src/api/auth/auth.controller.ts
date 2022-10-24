import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

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
