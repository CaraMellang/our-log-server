import { User } from '@entity/user/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtUtil {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async jwtCheck(accessToken: string) {
    try {
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
      return user;
    } catch (e) {
      console.log('jwt util error: ', e);
    }
  }
}
