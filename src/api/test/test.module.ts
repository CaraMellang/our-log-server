import { Module } from '@nestjs/common';
import { TestContoroller } from './test.controller';

@Module({
  imports: [],
  controllers: [TestContoroller],
  providers: [],
  exports: [],
})
export class TestModule {}
