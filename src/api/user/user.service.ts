import { User } from '@entity/user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getMyinfo(headers: any) {
    try {
      const accessToken = headers['authorization'].split(' ')[1];

      const decodedUser = this.jwtService.decode(accessToken) as {
        seq: number;
        email: string;
        role: string;
        lat: number;
        exp: number;
      };

      const user = await this.userRepository.findOne({ where: { seq: decodedUser.seq } });

      if (!user) throw new NotFoundException('유저가 존재하지 않습니다.');

      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
