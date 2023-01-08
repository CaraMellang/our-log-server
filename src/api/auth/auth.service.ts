import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
import { Blog } from '@entity/blog/blog.entity';

//천재 개발자의 class transformer
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(AuthToken)
    private readonly authTokenrepository: Repository<AuthToken>,
    @InjectRepository(UserLoginHistory)
    private readonly userLoginHistory: Repository<UserLoginHistory>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpReq: SignUpRequestDto) {
    try {
      const hashedPW = await bcrypt.hash(signUpReq.password, 10);
      const user = this.userRepository.create(signUpReq);
      user.password = hashedPW;
      const savedUser = await this.userRepository.save(user);
      const blog = this.blogRepository.create({
        owner: savedUser,
        blogTitle: `${savedUser.username}님 오늘도 좋은하루 보내세요`,
      });
      await this.blogRepository.save(blog);
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
      if (!user) throw new NotFoundException('없는 유저 입니다!', 'user not found');
      const comparedPW = await bcrypt.compare(signInReq.password, user.password);
      if (!comparedPW)
        throw new HttpException({ status: HttpStatus.UNAUTHORIZED, error: '잘못된 비밀번호입니다!' }, 401);

      const access_token = this.jwtService.sign({
        seq: user.seq,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      const tokenHistory = this.authTokenrepository.create({
        userSeq: user.seq,
        accessToken: access_token,
      });
      const clientIp = req.ip.split('::ffff:')[1] || req.ip.split('::')[1] === '1' ? '127.0.0.1' : '127.0.0.1';
      console.log('SignIn Ip : ', req.ip, clientIp, req.ip.split('::'));
      const userHistory = this.userLoginHistory.create({
        user: user,
        userAgent: req.headers['user-agent'],
        regIp: clientIp,
      });
      await this.authTokenrepository.save(tokenHistory);
      await this.userLoginHistory.save(userHistory);

      const response = { access_token, ...user };

      return response;
    } catch (e) {
      console.log('헤헤..', e);
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
      const user = await this.userRepository.findOne({
        where: { email: decodedToken.email },
      });
      if (!user) throw new HttpException({ status: 404, error: '유저가 존재하지 않습니다!' }, 404);

      const clientIp = req.ip.split('::ffff:')[1] || req.ip.split('::')[1] === '1' ? '127.0.0.1' : '127.0.0.1';
      console.log('SignIn Ip : ', req.ip, clientIp, req.ip.split('::'));
      const userHistory = this.userLoginHistory.create({
        user: user,
        userAgent: req.headers['user-agent'],
        regIp: clientIp,
        isAutoVerify: true,
      });
      await this.userLoginHistory.save(userHistory);

      const response = true;
      return response;
    } catch (e) {
      return e;
    }
  }
}
