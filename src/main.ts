import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);

  // const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
}
bootstrap();
