import { User } from '@entity/user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtUtil } from '@common/utils/JwtUtil';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly jwtUtil: JwtUtil,
  ) {}

  async getMyinfo(headers: any) {
    try {
      const accessToken = headers['authorization'].split(' ')[1];
      const user = this.jwtUtil.jwtCheck(accessToken);

      if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
