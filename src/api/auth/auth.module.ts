import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // PassportModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '60s' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
