import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostCreateRequestDto {
  @ApiProperty({ example: 'title', description: '블로그 타이틀 입니다.' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'content', description: '게시글의 콘텐츠입니다.' })
  @IsString()
  content: string;
}
//   seq: number;

//   blog: Blog;

//   owner: User;

//   title: string;

//   content: string;

//   tag: PostTag;
