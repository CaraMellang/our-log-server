import { Blog } from '@entity/blog/blog.entity';
import { PostTag } from '@entity/post/post-tag.entity';
import { Post } from '@entity/post/post.entity';
import { User } from '@entity/user/user.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Blog, Post, PostTag]),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
