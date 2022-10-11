import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User as UserModel, Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post(`/test`)
  async postTest(
    @Body() userData: { username: string; password: string; email: string },
  ) {
    const { username, password, email } = userData;
    console.log(userData);
    return this.prismaService.user.create({
      data: { username, password, email },
    });
  }

  @Get('/test')
  //   async getTest(@Param('id') id: string): Promise<UserModel> {
  async getTest(@Query('id') id: string): Promise<UserModel> {
    console.log('id', id);
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }
}
