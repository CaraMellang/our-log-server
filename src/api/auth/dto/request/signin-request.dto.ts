import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { YN } from 'src/common/types/constant/constant';

export class SignInRequestDto {
  @ApiProperty({ example: 'exsample@ex.com', description: '이메일' })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ example: '1234Asdf!@#$', description: '패스워드' })
  @IsString()
  password: string;
}
