import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exception/http-exceoption.filter';
import { TransformInterceptor } from './common/interceptor/response-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 엔티티 데코레이터에 없는 프로퍼티 값은 무조건 거름
      forbidUnknownValues: true, // 엔티티 데코레이터에 없는 값 인입시 그 값에 대한 에러메세지를 알려줌
      transform: true, // 컨트롤러가 값을 받을 때 컨트롤러에 정의한 타입으로 형변환
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('고양이 좋아요')
    .setDescription('저는 고양이파입니다.')
    .setVersion('1.0')
    .addTag('고양이태그')
    .addBearerAuth(
      {
        description: 'Bearer Access Token 을 입력해주세요.',
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.log(JSON.stringify(document));
  SwaggerModule.setup('api/v1/swagger-ui', app, document);
  /**해당 fs 파일저장사용시 핫 리로드가 파일도 인식해서 무한 loop를 만듭니다. yarn start로 당분간 사용해주세요.
   * 해당 이슈는 후일에 처리할 것입니다.
   * 기존파일을 생성, 제거하지말고 파일 내용을 바꿔주면 리로드가 안되나?
   * 한번 생성하시고 그 다음부턴 주석처리해서 핫 리로드를 사용하세요
   */
  // fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  //걍 글로발 때려줬습니다 ㅅㄱ
  global.SwaggerSpecJson = document;
  await app.listen(5000);
}
bootstrap();
