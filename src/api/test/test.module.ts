import { Module } from '@nestjs/common';
import { TestContoroller } from './test.controller';
import { EventsGateway } from './test.gateway';

@Module({
  imports: [],
  controllers: [TestContoroller],
  providers: [EventsGateway],
  exports: [],
})
export class TestModule {}
