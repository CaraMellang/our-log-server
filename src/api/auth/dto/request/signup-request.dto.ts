import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { YN } from 'src/common/types/constant/constant';

export class SignUpRequestDto {
  @ApiProperty({ example: 'exsample@ex.com', description: '이메일' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: '1234Asdf!@#$', description: '패스워드' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'NickName', description: '유저네임' })
  @IsString()
  username: string;

  @ApiProperty({ example: '01012345678', description: '폰번호' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'Y', description: 'sms동의여부' })
  @IsEnum(YN) //tree-shaking 문제?
  smsYn: YN;

  @ApiProperty({ example: 'string', description: '페북 내 사이트' })
  @IsOptional()
  @IsString()
  facebookHref: string;

  @ApiProperty({ example: 'string', description: '페북 내 사이트' })
  @IsOptional()
  @IsString()
  instagramHref: string;

  @ApiProperty({ example: 'h t t p s : / / individual.com', description: '개인 사이트' })
  @IsOptional()
  @IsString()
  individualHref: string;
}
