import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from '@entity/auth/auth-token.entity';
import { Blog } from '@entity/blog/blog.entity';
import { PostTag } from '@entity/post/post-tag.entity';
import { Post } from '@entity/post/post.entity';
import { UserLoginHistory } from '@entity/user/user-login-history.entity';
import { User } from '@entity/user/user.entity';

//이름을 잘 못지어서 뭘로할지 몰라서 그냥 없으면 안돌아가니까 코어라고 명명했습니다.
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '60s',
          issuer: 'Jeho, Lee',
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, AuthToken, UserLoginHistory, Blog, Post, PostTag]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule, JwtModule],
})
export class CoreModule {}
