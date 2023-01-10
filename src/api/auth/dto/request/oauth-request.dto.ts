import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class OAuthRequestDto {
  @ApiProperty({ example: '홍길동', description: '소셜이름 입니다.' })
  @IsString()
  displayName: string;

  @ApiProperty({ example: '이미지 url', description: 'url' })
  @IsString()
  profileImageUrl: string;

  @ApiProperty({ example: 'exsample@ex.com', description: '이메일' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: 'github', description: '소셜네트워크 제공자' })
  @IsString()
  provider: string;

  @ApiProperty({ example: '???', description: '소셜아이디' })
  @IsString()
  socialId: string;
}
