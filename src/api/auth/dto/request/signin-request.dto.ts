import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { YN } from 'src/common/types/constant/constant';

export class SignInRequestDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
