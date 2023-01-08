import { JwtAuthGuard } from '@common/guard/GlobalGuard/jwt-auth.guard';
import { Body, Get, Headers, Post, Query, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostCreateRequestDto } from './dto/post-create-request.dto';
import { PostService } from './post.service';

@ApiTags('게시판 API')
@Controller('api/v1/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiBody({ type: '' })
  @ApiOperation({
    summary: '게시판 API',
    description: '전체 게시판을 페이지네이션으로 가져옵니다. size는 한번에 가져올 페이지엘리먼트의 수를 의미합니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: 'true' })
  @ApiUnauthorizedResponse({ description: '불러오기 실패' })
  @Get('/all')
  async getAll(@Query('page') page: number, @Query('size') size: number) {
    console.log(page, size);
    return this.postService.getAll(page, size);
  }

  @ApiBody({ type: '' })
  @ApiOperation({
    summary: '게시판 API',
    description: '게시판을 생성합니다. title과 content가 필요합니다.',
  })
  @ApiCreatedResponse({ description: '성공', type: 'true' })
  @ApiUnauthorizedResponse({ description: '불러오기 실패' })
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() postCreateReq: PostCreateRequestDto, @Headers() headers) {
    return this.postService.createPost(postCreateReq, headers);
  }
}
