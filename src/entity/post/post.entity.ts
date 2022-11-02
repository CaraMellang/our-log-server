import { IsDate } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Blog } from '../blog/blog.entity';
import { User } from '../user/user.entity';
import { PostTag } from './post-tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  seq: number;

  @OneToOne(() => Blog, (Blog) => Blog.seq)
  blogSeq: number;

  @OneToOne(() => User, (User) => User.seq)
  ownerSeq: number;

  @Column({ comment: '게시글의 제목' })
  title: string;

  @Column({ comment: '게시글의 내용(Markdown)' })
  content: string;

  @OneToMany(() => PostTag, (PostTag) => PostTag.seq)
  tagSeq: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
