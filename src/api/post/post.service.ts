import { Blog } from '@entity/blog/blog.entity';
import { Post } from '@entity/post/post.entity';
import { User } from '@entity/user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '@utils/Pagination';
import { Repository } from 'typeorm';
import { PostCreateRequestDto } from './dto/request/post-create-request.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Blog) private readonly blogRepository: Repository<Blog>,
    private readonly jwtService: JwtService,
  ) {}

  async getAll(page: number, size: number) {
    if (page <= 0 || size <= 0) throw new BadRequestException(`잘못된 값이 들어왔습니다. page=${page} size=${size}`);
    try {
      const offset = (page - 1) * size;

      const posts = await this.postRepository.find({
        relations: { owner: true },
        take: size,
        skip: offset,
        order: { createdAt: 'DESC' },
      });

      const totalCount = await this.postRepository.count();

      return new Pagination<Post>(totalCount, page, size, posts, offset);
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  async createPost(postCreateReq: PostCreateRequestDto, headers: any) {
    try {
      const accessToken = headers['authorization'].split(' ')[1];

      const decodedUser = this.jwtService.decode(accessToken) as {
        seq: number;
        email: string;
        password: string;
        role: string;
        lat: number;
        exp: number;
      };

      const { seq, email, password, role } = decodedUser;
      const blogWhere = {
        seq,
        email,
        password,
        role,
      };

      const user = await this.userRepository.findOne({ where: { seq: decodedUser.seq } });
      const blog = await this.blogRepository.findOne({ where: { owner: blogWhere } });
      const savedPost = this.postRepository.create({
        ...postCreateReq,
        owner: user,
        blog,
      });
      await this.postRepository.save(savedPost);
      return true;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
