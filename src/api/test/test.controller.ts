import { Controller, Get } from '@nestjs/common';

@Controller('api/v1/test')
export class TestContoroller {
  constructor() {}

  @Get('/')
  async TestGet() {
    return '';
  }
}
