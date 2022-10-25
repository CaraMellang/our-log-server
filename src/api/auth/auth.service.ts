import { Injectable } from '@nestjs/common';
import { SignInRequestDto } from './dto/request/signup-request.dto';

@Injectable()
export class AuthService {
  async signUp(signUpReq: SignInRequestDto) {
    return `넹 ${JSON.stringify(signUpReq)}`;
  }
}
