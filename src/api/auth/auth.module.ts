import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { AuthToken } from 'src/entity/auth/auth-token.entity';
import { UserLoginHistory } from 'src/entity/user/user-login-history.entity';
import { JwtStrategy } from './strayegy/jwt-auth.stategy';
import { Blog } from '@entity/blog/blog.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AuthToken, UserLoginHistory, Blog]),
    PassportModule,
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
