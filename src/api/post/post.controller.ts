import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('게시판 API')
@Controller('api/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBody({ type: '' })
  @ApiOperation({
    summary: '게시판 API',
    description: '전체 게시판을 페이지네이션으로 가져옵니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: 'true' })
  @ApiUnauthorizedResponse({ description: '불러오기 실패' })
  @Get('/all')
  async signUp() {
    return this.postService;
  }
}
