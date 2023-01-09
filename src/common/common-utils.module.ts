import { Global, Module } from '@nestjs/common';
import { JwtUtil } from './utils/JwtUtil';

@Global()
@Module({
  imports: [],
  providers: [JwtUtil],
  exports: [JwtUtil],
})
export class CommonUtilsModule {}
