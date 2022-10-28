import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { AuthToken } from 'src/entity/auth/auth-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //   constructor(
  //     private readonly jwtService: JwtService,
  //     @InjectRepository(AuthToken)
  //     private readonly authTokenRepository: Repository<AuthToken>,
  //   ) {
  //     super();
  //   }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: boolean,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException('잘못되었거나 만료된 토큰입니다.');
    }
    return user;
  }
}
