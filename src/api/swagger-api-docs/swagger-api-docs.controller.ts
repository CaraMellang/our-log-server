import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
// import * as API_DOCS_JSON from 'swagger-spec.json';

@Controller('api/v1/swagger')
export class SwaggerApiDocsController {
  constructor() {}

  @Get('/api-docs')
  async getSwaggerApiDocs(@Res() res) {
    // console.log('잘찾아오셨어요', global);
    // console.log('ㅎㅇ', global.SwaggerSpecJson);
    res.status(HttpStatus.OK).json(global.SwaggerSpecJson);
  }
}
