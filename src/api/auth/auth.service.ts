import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpRequestDto } from './dto/request/signup-request.dto';
import * as bcrypt from 'bcrypt';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './dto/request/signin-request.dto';
import { AuthToken } from 'src/entity/auth/auth-token.entity';
import { UserLoginHistory } from 'src/entity/user/user-login-history.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private readonly authTokenrepository: Repository<AuthToken>,
    @InjectRepository(UserLoginHistory)
    private readonly userLoginHistory: Repository<UserLoginHistory>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpReq: SignUpRequestDto) {
    try {
      const hashedPW = await bcrypt.hash(signUpReq.password, 10);
      const user = this.userRepository.create(signUpReq);
      user.password = hashedPW;
      await this.userRepository.save(user);
      return true;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async signIn(req: Request, signInReq: SignInRequestDto) {
    try {
      const user = await this.userRepository.findOne({
        select: ['seq', 'email', 'password', 'role'],
        where: { email: signInReq.email },
      });
      if (!user) throw new NotFoundException('없습니다!', 'user not found');
      const comparedPW = await bcrypt.compare(
        signInReq.password,
        user.password,
      );
      if (!comparedPW)
        throw new HttpException(
          { status: HttpStatus.UNAUTHORIZED, error: '잘못된 비밀번호입니다!' },
          401,
        );

      const access_token = this.jwtService.sign({
        email: user.email,
        password: user.password,
        role: user.role,
      });

      const tokenHistory = this.authTokenrepository.create({
        userSeq: user.seq,
        accessToken: access_token,
      });
      console.log(req.ip.split('::ffff:')[1]);
      console.log(req.headers);
      const userHistory = this.userLoginHistory.create({
        userSeq: user.seq,
        userAgent: req.headers['user-agent'],
        regIp: req.ip.split('::ffff:')[1],
      });
      await this.authTokenrepository.save(tokenHistory);
      await this.userLoginHistory.save(userHistory);

      let response = { access_token };

      return response;
    } catch (e) {
      console.log(e);
      console.log(e.code);
      return e;
    }
  }

  async verifyUser(req: Request, access_token: string) {
    try {
      const accessToken = req.headers['authorization'].split(' ')[1];
      console.log(accessToken);
      const decodedToken = this.jwtService.decode(accessToken) as {
        email: string;
        updatedAt: string;
        iat: number;
        exp: number;
      };
      console.log(decodedToken);
      const user = await this.userRepository.findOne({
        select: ['email'],
        where: { email: decodedToken.email },
      });
      if (!user)
        throw new HttpException(
          { status: 404, error: '유저가 존재하지 않습니다!' },
          404,
        );

      return true;
    } catch (e) {
      return e;
    }
  }
}
