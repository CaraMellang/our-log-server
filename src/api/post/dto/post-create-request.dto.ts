import { IsString } from 'class-validator';

export class PostCreateRequestDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
//   seq: number;

//   blog: Blog;

//   owner: User;

//   title: string;

//   content: string;

//   tag: PostTag;
