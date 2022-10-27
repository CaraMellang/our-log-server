import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/request/signup-request.dto';
import * as bcrypt from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto } from './dto/request/signin-request.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
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

  async signIn(signInReq: SignInRequestDto) {
    try {
      const user = await this.userRepository.findOne({
        select: ['email', 'password', 'updatedAt'],
        where: { email: signInReq.email },
      });
      const comparedPW = await bcrypt.compare(
        signInReq.password,
        user.password,
      );
      if (!comparedPW)
        throw new HttpException(
          { status: HttpStatus.UNAUTHORIZED, error: '잘못된 비밀번호입니다!' },
          401,
        );

      let response = { access_token: '' };
      response.access_token = this.jwtService.sign({
        email: user.email,
        updatedAt: user.updatedAt,
      });

      return response;
    } catch (e) {
      console.log(e);
      console.log(e.code);
      return e;
    }
  }

  async verifyUser(access_token: string) {
    try {
      this.jwtService.verify(access_token);
      const decodedToken = this.jwtService.decode(access_token) as {
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
