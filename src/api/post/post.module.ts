import { Blog } from '@entity/blog/blog.entity';
import { PostTag } from '@entity/post/post-tag.entity';
import { Post } from '@entity/post/post.entity';
import { User } from '@entity/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtUtil } from '@common/utils/JwtUtil';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User, Blog, Post, PostTag])
  ],
  controllers: [PostController],
  providers: [PostService, JwtUtil],
})
export class PostModule {}
