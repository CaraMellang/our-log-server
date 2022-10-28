import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface Payload {
  email: string;
  password: string;
  role: string;
  iat:number;
  exp:number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false, // false일경우 passport에 토큰검증을 위임. true는 직접검증
      secretOrKey: 'secret', // 암호화 키
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     const accessToken = request.headers['authorization'].split(' ')[1];
      //     return accessToken;
      //   },
      // ]), // Request에서 jwt 토큰 추출방식 결정. from AuthHeaderAsBeaerer은 Bearer 토큰에 jwt를 담아 전송해야함.
    });
  }

  async validate(payload: Payload) {
    console.log('토큰', payload);
    return payload;
  }
}
