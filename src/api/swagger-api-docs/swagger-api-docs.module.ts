import { Module } from '@nestjs/common';
import { SwaggerApiDocsController } from './swagger-api-docs.controller';

@Module({
  imports: [],
  controllers: [SwaggerApiDocsController],
  providers: [],
})
export class SwaggerApiDocsModule {}
