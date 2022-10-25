import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { YN } from 'src/common/types/constant/constant';

export class SignInRequestDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsEnum(YN)
  smsYn: 'Y' | 'N';

  @IsOptional()
  @IsString()
  facebookHref: string;

  @IsOptional()
  @IsString()
  instagramHref: string;

  @IsOptional()
  @IsString()
  individualHref: string;
}
