import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  SwaggerModule.setup('api/v1/swagger-ui', app, document);
  await app.listen(5000);
}
bootstrap();
