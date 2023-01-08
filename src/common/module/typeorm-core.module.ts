import { AuthToken } from '@entity/auth/auth-token.entity';
import { Blog } from '@entity/blog/blog.entity';
import { PostTag } from '@entity/post/post-tag.entity';
import { Post } from '@entity/post/post.entity';
import { UserLoginHistory } from '@entity/user/user-login-history.entity';
import { User } from '@entity/user/user.entity';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, AuthToken, UserLoginHistory, Blog, Post, PostTag])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TypeormCoreModule {}
