import { IsDate } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Blog, (Blog) => Blog, { onDelete: 'CASCADE' })
  @JoinColumn()
  blog: Blog;

  @OneToOne(() => User, (User) => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner: User;

  @Column({ comment: '게시글의 제목' })
  title: string;

  @Column({ comment: '게시글의 내용(Markdown)' })
  content: string;

  @OneToMany(() => PostTag, (PostTag) => PostTag, { cascade: true })
  @JoinColumn()
  tag: PostTag;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;
}
